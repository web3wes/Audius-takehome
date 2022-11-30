use anchor_lang::prelude::*;

pub mod constant;
pub mod error;
pub mod states;
use crate::{constant::*, error::*, states::*};

declare_id!("2WVA8UVVMAXbCCKD5Mf3konR6fVgghCHysk9An4mZR1Q");
// declare_id!("7d1r5rNdLz1xSEqCNimo7LAYd4pyWPX3tFdTy1AueTeR");

#[program]
pub mod trakr {
    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        // Initialize user profile with default data
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.last_track = 0;
        user_profile.track_count = 0;

        Ok(())
    }

    pub fn add_track(ctx: Context<AddTrack>, _content: String) -> Result<()> {
        let track_account = &mut ctx.accounts.track_account;
        let user_profile = &mut ctx.accounts.user_profile;

        // Fill contents with argument
        track_account.authority = ctx.accounts.authority.key();
        track_account.idx = user_profile.last_track;
        track_account.content = _content;
        track_account.marked = false;

        // Increase todo idx for PDA
        user_profile.last_track = user_profile.last_track.checked_add(1).unwrap();

        // Increase total todo count
        user_profile.track_count = user_profile.track_count.checked_add(1).unwrap();

        Ok(())
    }

    pub fn mark_track(ctx: Context<MarkTrack>, track_idx: u8) -> Result<()> {
        let track_account = &mut ctx.accounts.track_account;
        require!(!track_account.marked, TodoError::AlreadyMarked);

        // Mark todo
        track_account.marked = true;
        Ok(())
    }

    
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<UserProfile>(),
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct AddTrack<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        init,
        seeds = [TODO_TAG, authority.key().as_ref(), &[user_profile.last_track as u8].as_ref()],
        bump,
        payer = authority,
        space = 1000
    )]
    pub track_account: Box<Account<'info, TrackAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(track_idx: u8)]
pub struct MarkTrack<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        mut,
        seeds = [TODO_TAG, authority.key().as_ref(), &[track_idx].as_ref()],
        bump,
        has_one = authority,
    )]
    pub track_account: Box<Account<'info, TrackAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}


pub fn is_zero_account(account_info: &AccountInfo) -> bool {
    let account_data: &[u8] = &account_info.data.borrow();
    let len = account_data.len();
    let mut is_zero = true;
    for i in 0..len - 1 {
        if account_data[i] != 0 {
            is_zero = false;
        }
    }
    is_zero
}

pub fn bump(seeds: &[&[u8]], program_id: &Pubkey) -> u8 {
    let (_found_key, bump) = Pubkey::find_program_address(seeds, program_id);
    bump
}
