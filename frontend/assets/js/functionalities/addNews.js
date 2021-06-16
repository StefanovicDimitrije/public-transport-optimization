const addNewArticle = () => {
    let MyDate = new Date();
    let MyDateString;
    MyDateString = MyDate.getFullYear() + '-'
        + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
        + ('0' + MyDate.getDate()).slice(-2);
    let coverPath = document.getElementById("articleCover").value;
    let coverImg = coverPath.replace('C:\\fakepath\\', '');
    let article = {                                     ///create object with selected values
        id: null,
        date: MyDateString,
        author: JSON.parse(sessionStorage.getItem('user')), //CHANGE LATER
        title: document.getElementById("articleTitle").value,
        text: document.getElementById("articleText").value,
        cover: coverImg
    }
    console.log(article);
    validation = validateForm();
    if (validation == false)
    {
        document.getElementById("notification").innerHTML =
            `<div class="alert alert-danger" role="alert">
            <div class="container">
              <div class="alert-icon">
                <i class="now-ui-icons objects_support-17"></i>
              </div>
              <strong>Oh snap!</strong> Change a few things up and try submitting again.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">
                  <i class="now-ui-icons ui-1_simple-remove"></i>
                </span>
              </button>
            </div>
          </div>
            `;
            return -1;
    }
    fetch('http://localhost:3000/news/', {
        method: 'POST',
        body: JSON.stringify(article), // !!!!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((articleReply) => {
        return articleReply.json();
    }).then((articleReplyJSON) => {
        if (articleReplyJSON.status === "added") {                     //successfull output
            document.getElementById("notification").innerHTML = `
            <div class="alert alert-success" role="alert">
                        <div class="container">
                            <div class="alert-icon">
                                <i class="now-ui-icons ui-2_like"></i>
                            </div>
                            <strong>Well done!</strong> You successfully added a new article to our news feed!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">
                                    <i class="now-ui-icons ui-1_simple-remove"></i>
                                </span>
                            </button>
                        </div>
                    </div>
            `;

        }
        else {                                                      //unsuccessfull output
            document.getElementById("notification").innerHTML =
            `<div class="alert alert-danger" role="alert">
            <div class="container">
              <div class="alert-icon">
                <i class="now-ui-icons objects_support-17"></i>
              </div>
              <strong>Oh snap!</strong> Change a few things up and try submitting again.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">
                  <i class="now-ui-icons ui-1_simple-remove"></i>
                </span>
              </button>
            </div>
          </div>
            `;
        };
    })
}


function validateForm() {                               //simple form validation
    const title = document.getElementById("articleTitle").value;
    const text = document.getElementById("articleText").value;
    if (title == "") {
        alert("Title field must not be empty!");
        return false;
    } else if (text == "") {
        alert("Please enter some more details regarding this news");
        return false;
    } else {
        return true;
    }
}