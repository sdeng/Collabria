var messages = new Meteor.Collection('messages');


if (Meteor.isClient) {
    // Populate messages in chat template
    Template.chat.messages = function() {
        return messages.find({}, {sort: {timestamp_utc: -1}});
    }

    // Submit message with enter key
    $('#input-box').live('keydown', function(event) {
        var timestamp, timestamp_utc;
        var message = $('#input-box')[0].value;
        if ((event.keyCode == 13) && (message.length > 0)) {
            timestamp_utc = Date.now();
            timestamp = Date(timestamp_utc).split(' ')[4];
            messages.insert({
                message: message,
                timestamp_utc: timestamp_utc,
                timestamp: timestamp
            });
            $('#input-box')[0].value = '';
        }
    });
}


if (Meteor.isServer) {
    Meteor.startup(function () {
        // Code to run on server at startup
    });
}
