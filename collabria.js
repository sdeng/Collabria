var messages = new Meteor.Collection('messages');


if (Meteor.isClient) {
    // Populate messages in chat template
    Template.chat.messages = function() {
        return messages.find({}, {sort: {timestamp_utc: -1}});
    }

    // Submit message with enter key
    $('#input-box').live('keydown', function(event) {
        var message = $('#input-box')[0].value;
        if ((event.keyCode == 13) && (message.length > 0)) {
            $('#input-box')[0].value = '';
            Meteor.call('insert_message', message);
        }
    });
}


if (Meteor.isServer) {
    Meteor.startup(function () {
        // Code to run on server at startup
    });

    Meteor.methods({
        insert_message: function(message) {
            var timestamp, timestamp_utc;
            timestamp_utc = Date.now();
            timestamp = Date(timestamp_utc).split(' ')[4];
            messages.insert({
                message: message,
                timestamp_utc: timestamp_utc,
                timestamp: timestamp
            });
        }
    });
}
