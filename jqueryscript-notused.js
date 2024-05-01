$(document).ready(function () {
	$('#add-tab').click(function () {
		createTab();
	});
	$(document).on('click', '.tab', function () {
		var tab = $(this);
		var index = $('.tabs-menu').children().index(tab);
		var tabContent = $('.tabs-data').children().eq(index);
		showTab(tab, tabContent);
	});
	$(document).on('click', '.tab-close', function (event) {
		event.stopPropagation();
		var tab = $(this).closest('.tab');
		var index = $('.tabs-menu').children().index(tab);
		var tabContent = $('.tabs-data').children().eq(index);
		closeTab(tab, tabContent, index);
	});
	$(document).on('keypress', '.urlInput', function (event) {
		if (event.which === 13) {
			var input = $(this);
			var iframe = input.nextAll('iframe');
			loadURL(input, iframe);
		}
	});

	function showTab(tab, tabContent) {
		$('.tab, .tab-content').removeClass('active');
		tab.addClass('active');
		tabContent.addClass('active').css('display', 'block').siblings().removeClass('active').css('display', 'none');
	}

	var count = 1;

	function createTab() {
		var tabsMenu = $('.tabs-menu');
		var tabsData = $('.tabs-data');
		var tab = $('<div>').addClass('tab active').text('Tab ' + count);
		var tabClose = $('<span>').addClass('tab-close').text('x');
		var tabContent = $('<div>').addClass('tab-content active').html('Enter the URL ' + count);
		var input = $('<input>').attr({
			type: 'text',
			class: 'urlInput',
			placeholder: 'Enter URL and press Enter'
		});
		var search_button = $('<button>').addClass('search-button').text('Search');
		tabContent.append(input, search_button, '<br>', $('<iframe>').addClass('urlLoader'));
		count++;
		tab.append(tabClose);
		tabsMenu.append(tab);
		tabsData.append(tabContent);
		showTab(tab, tabContent);
	}

	function loadURL(input, iframe) {
		var url = input.val().trim();
		if (url !== '') {
			fetch('https://cors-anywhere.herokuapp.com/' + url)
				.then(response => response.text())
				.then(data => {
					const modifiedContent = `<html><head><base href="${url}"><style>body{font-family:Arial,sans-serif;margin:0;padding:20px;}</style></head><body>${data}</body></html>`;
					iframe.attr('srcdoc', modifiedContent);
				})
				.catch(error => console.error('Error fetching content:', error));
		} else {
			alert('Please enter a valid URL.');
		}
	}

	function closeTab(tab, tabContent, index) {
		tab.remove();
		tabContent.remove();
		var nextTab = $('.tabs-menu').children().eq(index);
		var tabContent = $('.tabs-data').children().eq(index);
		if (nextTab.length == 0) {
			nextTab = $('.tabs-menu').children().eq(0);
			tabContent = $('.tabs-data').children().eq(0);
		}
		var activeTabIndex = $('.tabs-menu').find('.tab.active').index();
		if (index == activeTabIndex || activeTabIndex == -1) {
			showTab(nextTab, tabContent);
		}
	}
});