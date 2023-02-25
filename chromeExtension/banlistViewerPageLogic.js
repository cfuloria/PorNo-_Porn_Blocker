window.onload = () => {
  chrome.storage.sync.get('userBanlists', function(returnedObject) {
    let userBanData = returnedObject['userBanlists'];
    let sites = Object.keys(userBanData); // what if this data doesnt exist at this point ??

    for (item in sites) {
      if (sites[item] !== 'listOfEntireSites') {
        addUrlListItemToSpecificList(sites[item], 'listOfSpecificSites');
      }
    }

    let exactSites = userBanData['listOfEntireSites'];
    for (item in exactSites) {
      addUrlListItemToSpecificList(exactSites[item], 'listOfEntireSites');
    }
  });

  // let sites = [
  //   'reddit.com/r/nsfwexample1',
  //   'reddit.com/r/nsfwexample2',
  //   'site3.net/video13',
  //   'gamingsite.com/adultsection'
  // ];

  // for (item in sites) {
  //   addListItemToSpecificSitesList(sites[item]);
  // }

  // let exactSites = [
  //   'blahblahnsfw.org',
  //   'randomadultsite.abc',
  //   'pornwhatever.ok'
  // ];

  // for (item in exactSites) {
  //   addListItemToEntireSitesList(exactSites[item]);
  // }
};

function addUrlListItemToSpecificList(url, specificList) {
  let name = url;
  let specifiedList = document.getElementById(specificList);
  if (!specifiedList) {
    return;
  }

  let li = document.createElement("p");
  let t = document.createTextNode(name);
  li.appendChild(t);
  specifiedList.appendChild(li);

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "delete";
  span.title = `Delete ${url}`

  span.addEventListener('click', () => {
    let userConfirmedDelete = confirm(
      `Delete this link?\n${url}`
    );

    if (userConfirmedDelete) {
      if (specificList === 'listOfSpecificSites') {
        chrome.storage.sync.get('userBanlists', function(returnedObject) {
          let userBanData = returnedObject['userBanlists'];

          delete userBanData[url];

          try {
            chrome.storage.sync.set({ userBanlists: userBanData }, function() {
              alert(`Succesfully deleted URL:\n${url}`);
            });
          } catch (e) {
            alert(`Error with deleting URL:\n${url}\n\nPlease try again after a minute.`);
          }
        });
      }
      else if (specificList === 'listOfEntireSites') {
        // addEntireSitesDeleteHandler();
      }
      else {
        return;
      }

      // ?? How to delete based on specific or general url?
      // 
      // try {
      //   chrome.storage.sync.remove([keyValueToRemove], function () {});
      // } catch (e) {
      //   document.getElementById("ERROR_MSG").innerHTML =
      //     "Too many operations...please try again later, sorry!";
      // }
  
      // // Only update list when we confirm that the desired deletion has succeeded
      // if (
      //   chrome.storage.sync.get([keyValueToRemove], function () {}) === undefined
      // ) {
        li.remove()
      // }
    }
  });

  span.appendChild(txt);
  li.appendChild(span);
}