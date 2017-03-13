import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import {Links} from '../collections/Links';

const cheerio = require('cheerio');

// export const linkCheck = function (name, url) {
//
//     const async = require('async');
//
//     HTTP.call("HEAD", url,
//         function (error, result) {
//             if (!error && result.statusCode === 200) {
//
//                 if (result.headers['content-type'].indexOf('text') > -1) {
//                     HTTP.call("GET", url, function (error, result) {
//                         if (!error && result.statusCode === 200) {
//
//                             $ = cheerio.load(result.content);
//
//                             let description = $('meta[name=description]').attr("content");
//                             let title = $('meta[name=title]').attr("content") || $('meta[property="og:title"]').attr("content");
//                             let image = $('meta[property="og:image"]').attr("content");
//
//                             let link = {
//                                 name: name,
//                                 url: url,
//                                 meta: {
//                                     title: (typeof title === 'undefined') ? '' : title,
//                                     description: (typeof description === 'undefined') ? '' : description,
//                                     image: (typeof image === 'undefined') ? '' : image,
//                                 }
//                             };
//
//                             Links.insert(link, function (err, res) {
//                                 if (err) {
//                                     console.log(err);
//                                 }
//                             });
//
//                         } else
//                             console.log(error);
//
//                     });
//                 } else if (result.headers['content-type'].indexOf('image') > -1) {
//                     Links.insert({name: name, url: url}, function (err, res) {
//                         if (err) {
//                             console.log(err);
//                         }
//                     });
//                 }
//
//             } else
//                 console.log(error);
//         });
// };

function getResult(name, url) {
    HTTP.call("GET", url, function (error, result) {
        if (!error && result.statusCode === 200) {

            $ = cheerio.load(result.content);

            let description = $('meta[name=description]').attr("content");
            let title = $('meta[name=title]').attr("content") || $('meta[property="og:title"]').attr("content");
            let image = $('meta[property="og:image"]').attr("content");

            let link = {
                name: name,
                url: url,
                meta: {
                    title: (typeof title === 'undefined') ? '' : title,
                    description: (typeof description === 'undefined') ? '' : description,
                    image: (typeof image === 'undefined') ? '' : image,
                }
            };

            linkSave(link);


        } else
            throw new Meteor.Error(500, err);

    });
}

function linkSave(obj) {
    Links.insert(obj, function (err, res) {
        if (err) {
            throw new Meteor.Error(500, err);
        } else {
            console.log('linkSave - ok')
        }
    });
}


export const linkExec = function (name, url) {

    HTTP.call("HEAD", url,
        function (error, result) {
            if (!error && result.statusCode === 200) {

                if (result.headers['content-type'].indexOf('text') > -1) {
                    getResult(name,url);
                } else if (result.headers['content-type'].indexOf('image') > -1) {
                    linkSave({name: name, url:url});
                }

            } else
                throw new Meteor.Error(500, error);
        });
};