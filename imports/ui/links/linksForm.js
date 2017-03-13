import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './linksForm.html';


Template.linksForm.onCreated(function () {

});

Template.linksForm.onRendered(function () {

});

Template.linksForm.helpers({

});

Template.linksForm.events({
    'submit #links-form': function (e,t) {
        e.preventDefault();

        console.log();
        console.log();

        let name = e.target.name.value,
            url = e.target.url.value;

        Meteor.call('link.add', name, url, function (err, res) {
            if(!err){
                $('[name=name]').val('');
                $('[name=url]').val('');
            } else {
                console.log(err);
            }
        })
    }
});

Template.linksForm.onDestroyed(function () {

});