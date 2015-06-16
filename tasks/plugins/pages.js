'use strict';


module.exports = function(options) {
  return function(files, metalsmith, done) {
    var data = metalsmith.metadata();
    var pages = expand_pages(data.pages || []);
    data.pages = pages;
    metalsmith.metadata(data);
    update_files(files, pages);
    done();
  };
}

function expand_pages(pages) {
    var input = pages;
    var pages = [];
    pages.plain = [];
    input.forEach(function(page) {
        var page = expand_page(page);
        if (typeof page.path === 'string') {
            pages.plain.push(page);
        } else {
            page.pages = [];
            page.path.forEach(function(subpage, index) {
                var subpage = expand_page(subpage);
                if (index === 0) {
                    page.path = subpage.path;
                }
                page.pages.push(subpage);
                pages.plain.push(subpage);
            });
        }
        pages.push(page);
    });
    return pages;
}

function expand_page(page) {
    var name = Object.keys(page)[0];
    var path = page[name];
    return {
        name: name,
        path: path,
    };
}

function update_files(files, pages) {
    Object.keys(files).forEach(function(key) {
        files[key] = update_file(files[key], pages);
    });
}

function update_file(file, pages) {
    var path = file.path;
    var prev;
    var next;
    if (!path) {
        path = '/';
    } else {
        path = '/' + path + '/';
    }
    pages.plain.forEach(function(page, index) {
        if (path === page.path) {
            if (index > 0) {
                prev = pages.plain[index-1].path;
            }
            if (index < pages.plain.length-1) {
                next = pages.plain[index+1].path;
            }
        }
    });
    file.path = path;
    file.prev = prev;
    file.next = next;
    return file;
}
