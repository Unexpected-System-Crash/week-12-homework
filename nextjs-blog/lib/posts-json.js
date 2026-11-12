//imports the useful stuff
import got from 'got';

const dataURL = "https://dev-cs-55-week-12-homework.pantheonsite.io/wp-json/twentytwentytwo-child/v1/latest-posts/1";


//gets all of the post data from a particular post
export async function getSortedPostsData() {
    let jsonString;
    try {
        jsonString = await got(dataURL);
        
    } catch {
        jsonString.body = [];
        console.log(error);
    }

    const jsonObj = JSON.parse(jsonString.body);

    jsonObj.sort(function (a, b) {
        return a.post_title.localeCompare(b.post_title);
    });

    return jsonObj.map(item => {
        return {
            id: item.ID.toString(),
            name: item.post_title
        }
    });
    
}

//function to get specifically the post IDs. 
// most of it is very similar to the above function
export async function getAllPostIds() {
    let jsonString;
    try {
        jsonString = await got(dataURL);
        
    } catch {
        jsonString.body = [];
        console.log(error);
    }
    const jsonObj = JSON.parse(jsonString.body);

    //returns the title and date of a particular post
    return jsonObj.map(item => {
        return {
            params: {
                id: item.ID.toString()
            }
        }
    });
}
//returns the post with the specified ID
//must recieve the id parameter
export async function getPostData(id) {
    let jsonString;
    try {
        jsonString = await got(dataURL);
        
    } catch {
        jsonString.body = [];
        console.log(error);
    }
    const jsonObj = JSON.parse(jsonString.body);
    const objReturn = jsonObj.filter(obj => {
        return obj.ID.toString() === id;
    });

    //checks to see if the post ID is valid
    if (objReturn.length === 0) {
        return {
            id: id,
            title: 'Nothing Found',
            date: '',
            contentHtml: 'Hey Jimmy, gimmie a page with nuthin.'
        }
    } else {
        return objReturn[0];
    }


}