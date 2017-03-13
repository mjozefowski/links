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

});

Template.linksList.onDestroyed(function () {

});
