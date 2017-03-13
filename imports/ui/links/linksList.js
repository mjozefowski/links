import { Template } from 'meteor/templating';
import { Links } from  '../../api/collections/Links';
import './linksList.html';


Template.linksList.onCreated(function () {

});

Template.linksList.onRendered(function () {

});

Template.linksList.helpers({
    link: function () {
        return Links.find({});
    }
});

Template.linksList.events({
    'submit #links-form': function (e,t) {
        e.preventDefault();
        console.log('asdf')
    }
});

Template.linksList.onDestroyed(function () {

});
