/*<div class="rating">
<i class="rating__star far fa-star"></i>
<i class="rating__star far fa-star"></i>
<i class="rating__star far fa-star"></i>
<i class="rating__star far fa-star"></i>
<i class="rating__star far fa-star"></i>
<i class="rating__star far fa-star"></i>
<i class="rating__star far fa-star"></i>
<i class="rating__star far fa-star"></i>
<i class="rating__star far fa-star"></i>
<i class="rating__star far fa-star"></i>
</div>*/

const getDrivers = () => {

    startLogin();

    fetch('http://localhost:3000/review/', {
        method: "GET"
    }).then((res) => {
        return res.json();
    }).then((review) => {
        let divReview = document.getElementById("getDrivers");
        driversReview = review.review
        allDrivers = review.driver

        const div = document.querySelector("select")


        for (let i = 0; i < allDrivers.length; i++) {
            const option = new Option(allDrivers[i].name);
            option.value = allDrivers[i].id;
            div.add(option, allDrivers[i].id)
            console.log(option)

            option.focus();

        }

        for (let i = 0; i < allDrivers.length; i++) {

            let ocena = 0;
            let sum = 0;
            let br = 0;
            for (let j = 0; j < driversReview.length; j++) {

                if (allDrivers[i].id == driversReview[j].tk_id_driver) {

                    sum = sum + driversReview[j].mark;
                    br++
                    ocena = sum / br;

                }

            }

            driver = document.createElement("div");
            driver.innerHTML =
            
            `<div id="ocena" class="card p-3 mt-2">
            <div class="d-flex justify-content-between align-items-center">
                
                <div class="user d-flex flex-row align-items-center"> 
                    <img src="${allDrivers[i].img}" width="50" height="50" class="user-img rounded-circle mr-2">
                        <small class="font-weight-bold text-primary" style = "font-size: 150%">
                        ${allDrivers[i].name}  ${allDrivers[i].surname}</small>
                        <small class="font-weight-bold " style = "font-size: 100%">
                        </small>
                </div>
                
                <div class="action d-flex justify-content-between align-items-center" style="padding-right: 40px;">
                    <h3 style="margin-bottom: 0px;">${Math.round(ocena)}/10</h3>
            
                    <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                </div>
            </div>
            </div>
       `;

            divReview.appendChild(driver);


        }
    })
}

const star = (ocena) => {
    console.log(ocena)
    let tagR = document.getElementById("stars")
    tag = document.createElement("div")
    for (let i = 0; i < ocena; i++) {

        tag.innerHTML =
            `<i class="rating__star far fa-star"></i>`
    }

}


const postReview = () => {
    event.preventDefault();
    let review = {
        tk_id_user: JSON.parse(sessionStorage.getItem('user')).id,
        driver: document.forms[0].select.value,
        mark: document.forms[0].mark.value,
        comment: document.forms[0].comment.value
    }
    console.log(review)
    fetch('http://localhost:3000/review/', {
        method: 'POST',
        body: JSON.stringify(review),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    }).then((review) => {
        console.log(review)
        return review.json();
    }).then((reviewPost) => {


        if (reviewPost.status === "added") {
            alert("You'r successfully add review");
        } else {
            alert("Error")
        }
    })
}