'use strict';

/**
 * finds the link from the data storage based on the alias from the input field
 */
function findAlias() {
  var key = document.getElementById('inputAlias').value;
  $('#linkContainer').css('display', 'none');
  client.db.get(key)
    .then(function (data) {
      $('#linkContainer').css('display', 'block');
      $('#link').text(data.url);
      $('#updates').text(data.updates);
    }, function (error) {
      console.error('Error: failed to fetch alias');
      console.error(error);
      showNotify('info', 'The alias does not exist');
    });
}

/**
 * Closes the current modal and sends message to parent to show a notification toast with the given title and message
 *
 * @param {String} type - type of the notification
 * @param {String} title - title of the notification
 * @param {String} message - content to be shown in the notification
 **/
function showNotify(type, message) {
  client.instance.send({
    message: {
      api: 'interface',
      action: 'trigger',
      method: 'showNotify',
      payload: { type: type, message: message }
    }
  });
}

$(document).ready(function () {
  app.initialized().then(function (_client) {
    window.client = _client;
  }).catch(function (error) {
    console.error('Failed to initialize the find_alias modal with error');
    console.error(error);
  });

  $('#btnResolveAlias').click(findAlias);
});
