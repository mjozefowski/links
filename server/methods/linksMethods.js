import SimpleSchema from 'simpl-schema';
import { linkExec } from '/imports/api/methods/linksMethods';

Meteor.methods({

    'link.add': function (name, url) {
        new SimpleSchema({
            name: String,
            url: SimpleSchema.RegEx.Url
        }).validate({name, url});

        linkExec(name, url, function (err) {
            if(err){
                throw new Meteor.Error("link.add", "Something went wrong");
            }
        });
    }

});