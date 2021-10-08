'use strict';

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
	console.debug('navAllStories', evt);
	hidePageComponents();
	putStoriesOnPage();
}

$body.on('click', '#nav-all', navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
	console.debug('navLoginClick', evt);
	hidePageComponents();
	$loginForm.show();
	$signupForm.show();
}

$navLogin.on('click', navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
	console.debug('updateNavOnLogin');
	$('.main-nav-links').show();
	$navLogin.hide();
	$navLogOut.show();
	$navUserProfile.text(`${currentUser.username}`).show();
}

/** Submit story to add to site */
$('.uploadButton').on('click', function() {
	submitStory();
	$('#storyNameForm').val('');
	$('#authorForm').val('');
	$('#urlForm').val('');
});
// Show submit form
$('#submitLink').on('click', function(evt) {
	console.debug('submissionForm');
	evt.preventDefault();
	hidePageComponents();
	$('.submitForm').show();
});

async function submitStory() {
	await submitForm();
}

$('#favoriteLink').on('click', (evt) => {
	evt.preventDefault();
	showFavesList();
});

$('.stories-list').on('click', '#faveIcon', function(evt) {
	evt.preventDefault();
	const $evtTarget = $(this);
	$(this).toggleClass('unfavorite');
	$(this).toggleClass('favorited');
	currentUser.favoritedStories($evtTarget);
});

$('.stories-list').on('click', '.removeStory', async function(evt) {
	evt.preventDefault();
	const $evtTarget = $(this);
	let storyId = $evtTarget.parent().parent().attr('id');
	await storyList.removeStory(currentUser, storyId);
});
