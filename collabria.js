var messages = new Meteor.Collection('messages');


if (Meteor.isClient) {
    var color = '#';
    var letters = '0123456789ABCDEF'.split('');
    for (var i=0; i<6; i++) {
        color += letters[Math.round(Math.random()*15)];
    }

    // Populate messages in chat template
    Template.chat.messages = function() {
        return messages.find({}, {sort: {timestamp_utc: -1}});
    }

    // Submit message with enter key
    $('#input-box').live('keydown', function(event) {
        var message = $('#input-box')[0].value;
        if ((event.keyCode == 13) && (message.length > 0)) {
            $('#input-box')[0].value = '';
            Meteor.call('insert_message', color, message);
        }
    });
}


if (Meteor.isServer) {
    Meteor.startup(function () {
        // Code to run on server at startup
    });

    Meteor.methods({
        insert_message: function(color, message) {
            var timestamp, timestamp_utc;
            timestamp_utc = Date.now();
            timestamp = Date(timestamp_utc).split(' ')[4];
            messages.insert({
                color: color,
                message: message,
                timestamp_utc: timestamp_utc,
                timestamp: timestamp
            });
        }
    });
}
