'use strict';

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
	storyList = await StoryList.getStories();
	$storiesLoadingMsg.remove();

	putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
	console.debug('generateStoryMarkup', story);

	let hostName = story.getHostName();
	return $(`
  
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small  ><a class="unfavorite" id="faveIcon" href="">(-)</a></small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
		<small ><a class ="removeStory" href="">remove</a></small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
	console.debug('putStoriesOnPage');

	$allStoriesList.empty();

	// loop through all of our stories and generate HTML for them
	for (let story of storyList.stories) {
		const $story = generateStoryMarkup(story);
		$allStoriesList.append($story);
	}
	correctFaveClass();
	$allStoriesList.show();
}

//
async function submitForm() {
	const formName = document.getElementById('storyNameForm');
	const formStory = document.getElementById('authorForm');
	const formUrl = document.getElementById('urlForm');
	let newObj = {
		title: formName.value,
		author: formStory.value,
		url: formUrl.value
	};

	let newStory = await storyList.addStory(currentUser, newObj);
}

//corrects the class and text of the stories list so that it is correct when refreshing, etc.
function correctFaveClass() {
	const favIds = [];
	for (let favs of currentUser.favorites) {
		favIds.push(favs.storyId);
	}
	for (let i = 0; i < favIds.length; i++) {
		const favElem = favIds[i];
		$(`#${favElem}`)
			.children()
			.children('#faveIcon')
			.toggleClass('unfavorite')
			.toggleClass('favorited')
			.text('(+)');
	}
}

function showFavesList() {
	console.debug('showFavesList');

	$allStoriesList.empty();

	// loop through all of our stories and generate HTML for them
	for (let story of currentUser.favorites) {
		const $story = generateStoryMarkup();
		$allStoriesList.append($story);
	}
	correctFaveClass();
	$allStoriesList.show();
}
