const type = document.getElementById("typeId");
const link = document.getElementById("link");
const allFomrats = document.getElementById("allFormats");
const options = document.querySelectorAll(".options");
const option = [...options];
function myFunction() {
  getInfo(link.value);
  if (option[0].selected === true) {
    //getInfo(link.value);
  } else if (option[1].selected === true) {
    downloadMP3(link.value);
  }
}

const downloadMP3 = (url) => {
  const userURL = `${window.location.href}downloadmp3?url=${url}`;
  console.log(userURL);
  fetch(userURL).then((res) => {
    if (res.status === 200) {
      const downloadLink = document.createElement("a");
      downloadLink.setAttribute("download", "");
      downloadLink.href = userURL;
      downloadLink.click();
    } else if (res.status === 400) {
      alert("invalid URL");
    }
  });
};

const downloadMP4 = (url) => {
  const userURL = `${window.location.href}downloadmp4?url=${url}`;
  console.log(userURL);
  fetch(userURL).then((res) => {
    if (res.status === 200) {
      const downloadLink = document.createElement("a");
      downloadLink.setAttribute("download", "");
      downloadLink.href = userURL;
      downloadLink.click();
    } else if (res.status === 400) {
      alert("invalid URL");
    }
  });
};

const getInfo = (url) => {
  const userURL = `${window.location.href}onlyinfo?url=${url}`;
  fetch(userURL)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((body) => {
          console.log(body);
          const tableHead = document.getElementById("table-head");
          tableHead.innerHTML = `<tr>
          <th scope="col">Quality</th>
          <th scope="col">Size</th>
      </tr>`;
          allFomrats.innerHTML = "";
          body.forEach((item) => {
            const row = document.createElement("tr");
            const rowItem1 = document.createElement("td");
            rowItem1.innerText = item.quality + "p";
            rowItem1.classList.add("text-center");
            rowItem1.style.fontSize = "20px";
            row.appendChild(rowItem1);

            let size;
            if (item.size !== null) {
              let mb = item.size / 1000000;
              size = mb.toFixed(2) + " MB";
            }

            const rowItem2 = document.createElement("td");
            rowItem2.innerText = item.size === null ? "" : size;
            rowItem2.classList.add("text-center");
            rowItem2.style.fontSize = "19px";
            row.appendChild(rowItem2);

            const rowItem3 = document.createElement("td");
            const downloadURL = `${window.location.href}downloadmp4?url=${url}&itag=${item.itag}`;
            rowItem3.innerHTML = `<a class="btn btn-outline-primary btn-block" download href="${downloadURL}">Download</a>`;
            row.appendChild(rowItem3);

            allFomrats.appendChild(row);
          });
        });
      } else if (res.status === 400) {
        alert("Invalid Url");
      }
    })
    .catch((err) => console.log(err));
};
