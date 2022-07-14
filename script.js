

// toodolist app
const workName = document.getElementById("workname");
const workDescription = document.getElementById("workdescription");
const workAother = document.getElementById("workaother");
const statusList = document.getElementById("status");
const complateStatus = document.getElementById("complatestatus");
const submitBtn = document.querySelector(".submit");
const container = document.querySelector(".container");
const clearall = document.querySelector(".clearall");


let finalToodolis = [];
// localStorage.clear();
let data = new Date();
let miniut;
if (data.getMinutes() < 10)
    miniut = `0${data.getMinutes()}`;
else
    miniut = data.getMinutes();
let clock;
let toodolistData = [];
let count = 0;
function toodolistShow(event) {
    toodolistDataNew = JSON.parse(localStorage.getItem("items"));
    if (!(toodolistDataNew === null)) {
        toodolistDataNew = toodolistDataNew.filter(items => items !== null);

        toodolistDataNew.forEach((iteams, index) => {
            if (!(iteams === null) & !(iteams === "")) {
                let { workName, workDescription, workAother, timeAdd, statusList, complateStatus } = iteams[0];
                let statusListText = "";
                let statusListTextColor = "";
                let complateStatusText = "";
                const mainelement = document.createElement("div");

                if (statusList === "normal") {
                    statusListText = "عادی";
                    statusListTextColor = "status";

                }
                else if (statusList === "important") {
                    statusListText = "مهم";
                    statusListTextColor = "status-important";

                }
                else if (statusList === "warning") {
                    statusListText = "فوری";
                    statusListTextColor = "status-warning";
                }
                if (statusList === "unselect") {
                    statusListText = "مشخص نشده";
                    statusListTextColor = "status";

                }
                if (complateStatus === "complate") {
                    complateStatusText = "تکمیل شده";
                    mainelement.classList = "main complated";

                }
                if (complateStatus === "uncomplate") {
                    complateStatusText = "تکمیل نشده";
                    mainelement.classList = "main ";

                }
                if (complateStatus === "unselect") {
                    complateStatusText = "مشحص نشده";
                    mainelement.classList = "main ";

                }

                mainelement.innerHTML = `  <div class="items ">
            <div class="titlebox">
                <h3 class="itemtitle">${workName}</h3>
                <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 14h6v6M3 21l6.1-6.1M20 10h-6V4M21 3l-6.1 6.1" />
                    </svg></i>
            </div>
            <p class="discreption">${workDescription}</p>
            <div class="infowork">
                <small class="aother"><span>نویسنده : </span> <span class="aothername">${workAother}</span></small>
                <small class="time"><span>زمان ثبت :</span> <span class="timenumber">${timeAdd}</span></small>
                <small class="${statusListTextColor}"><span>وضعیت :</span> <span class="statusname">${statusListText}</span></small>

            </div>

        </div>
        <div class="toodostatus">
            <button class="deletebtn">حذف کردن</button>
            <button class="complatebtn">${complateStatusText}</button>

        </div>`;
                container.appendChild(mainelement);

            }
        });
        // console.log(toodolistDataNew);

    }

}
toodolistShow();

submitBtn.addEventListener("click", function () {

    toodolistDataLocal = JSON.parse(localStorage.getItem("items"));
    clock = `  ${data.getHours()}:${miniut}  `;
    if (workName.value.length > 0 & workDescription.value.length > 0 & workAother.value.length > 0) {
        location.reload();

        toodolistData[count] = [{
            workName: workName.value,
            workDescription: workDescription.value,
            workAother: workAother.value,
            timeAdd: clock,
            statusList: statusList.value,
            complateStatus: complateStatus.value
        }];
        toodolistDataNew = toodolistData.concat(toodolistDataLocal);
        localStorage.setItem("items", JSON.stringify(toodolistDataNew));
        container.innerHTML = "";

        toodolistShow();
    }
});


clearall.addEventListener("click", () => {
    container.innerHTML = "";
    toodolistDataNew = [];
    localStorage.removeItem("items")
});
const deletebtn = document.querySelectorAll(".deletebtn");
const mainitems = document.querySelectorAll(".main");
deletebtn.forEach((iteams, index) => {
    iteams.addEventListener("click", () => {
        location.reload();

        // console.log(index + 1);
        const mainSelector = iteams.parentElement.parentElement;
        // mainSelector.remove();
        // toodolistDataNew[index] = "";
        delete toodolistDataNew[index];
        toodolistDataNew = toodolistDataNew.filter(items => items !== null);
        localStorage.setItem("items", JSON.stringify(toodolistDataNew));

        container.innerHTML = "";
        toodolistShow();





    });
});
mainitems.forEach((iteams, index) => {
    iteams.addEventListener("click", function (event) {

        if (event.target.className === "complatebtn") {
            location.reload();

            if (toodolistDataNew[index][0].complateStatus === "uncomplate" | toodolistDataNew[index][0].complateStatus === "unselect") {
                // console.log(event.target.parentElement.parentElement);
                event.target.parentElement.parentElement.classList.toggle("complated");
                toodolistDataNew[index][0].complateStatus = "complate";
                toodolistDataNew = toodolistDataNew.filter(iteams => iteams !== null);
                localStorage.setItem("items", JSON.stringify(toodolistDataNew));
                console.log(toodolistDataNew[index][0].complateStatus);

            }
            else if (toodolistDataNew[index][0].complateStatus === "complate") {
                location.reload();

                // console.log(event.target.parentElement.parentElement);
                event.target.parentElement.parentElement.classList.toggle("complated");
                toodolistDataNew[index][0].complateStatus = "uncomplate";
                toodolistDataNew = toodolistDataNew.filter(iteams => iteams !== null);
                localStorage.setItem("items", JSON.stringify(toodolistDataNew));
                console.log(toodolistDataNew[index][0].complateStatus);

            }
        }


    });






});


// console.log(mainitems);


// setInterval(toodolistShow, 100);
