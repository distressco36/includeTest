const formatter = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0,});

  var barDisplay = 0;
  var currentGallery = 0; 
  var index = 0;
  var indexLength;

  function fillDisplayWindow() {

    if(document.getElementById('filt').value == '') {return;}

    if(document.getElementById('filt').value == 'deleteall'){
      var getall = document.getElementsByClassName('listing');
      if(getall.length == 0){document.getElementById('filt').value = ""; return;}
      const bound = getall.length;
      
      for(var i = 0; i < bound; i++){
        getall[0].remove();
      }
      document.getElementById('filt').value = "";
      return;
    }
    var searchval = document.getElementById('filt');
    var searchV = searchval.value;
    //console.log(searchV.toString());
    var found = globalDatabase.filter(house => house.address.includes(searchV));
    window.alert(found[0].address);
    if(found.length == 0) {console.log("Didn't find anything"); console.log(searchV); return;}
    else {
      for(var i = 0; i < found.length; i++)
        {
          createIndividualListing(found[i]);
        }
      }
    document.getElementById('filt').value = "";
    return;
  }

  function createIndividualListing(listingData) {
    
    const outerContainerDiv = document.createElement('div');
    outerContainerDiv.className = "listing";
    outerContainerDiv.id = listingData.listingRef;
    
    const newImage = document.createElement('img');
    newImage.className = "new-image";
    newImage.src = "https://photos.zillowstatic.com/fp/" + listingData.gallery[0] + "-uncropped_scaled_within_1536_1152.webp";
    newImage.setAttribute('style', "width:100%");
    newImage.setAttribute('id', listingData.listingRef);
    newImage.addEventListener('click', function(event){displayGallery(event.target.id); return;});

    const innerContainerDiv1 = document.createElement('div');
    innerContainerDiv1.className = "clearfix";
    innerContainerDiv1.style = "padding-left:3px;padding-right:3px";

      const innerH2L = document.createElement('h4');
      innerH2L.style = "float:left";
      innerH2L.innerHTML = "$" + formatter.format(listingData.price);
      innerContainerDiv1.appendChild(innerH2L);

      const circaIcon = document.createElement('span');
      circaIcon.className = "material-icons-outlined";
      circaIcon.innerHTML = "construction";
      circaIcon.style = "float:right;color:Blue;font-size:150%";
      const circaNum = document.createElement('span');
      circaNum.innerHTML = listingData.circa;
      circaNum.style = "float:right;color:Black;font-size:120%";
      innerContainerDiv1.appendChild(circaNum);
      innerContainerDiv1.appendChild(circaIcon);

      const sqftIcon = document.createElement('span');
      sqftIcon.className = "material-icons-outlined";
      sqftIcon.innerHTML = "square_foot";
      sqftIcon.style = "float:right;color:Blue;font-size:150%";
      const sqftNum = document.createElement('span');
      sqftNum.innerHTML = listingData.sqft;
      sqftNum.style = "float:right;color:Black;font-size:120%";
      innerContainerDiv1.appendChild(sqftNum);
      innerContainerDiv1.appendChild(sqftIcon);

      const bathIcon = document.createElement('span');
      bathIcon.className = "material-icons-outlined";
      bathIcon.innerHTML = "bathtub";
      bathIcon.style = "float:right;color:Blue;font-size:150%";
      const bathNum = document.createElement('span');
      bathNum.innerHTML = listingData.bath;
      bathNum.style = "float:right;color:Black;font-size:120%;padding-right:5px";
      innerContainerDiv1.appendChild(bathNum);
      innerContainerDiv1.appendChild(bathIcon);

      const bedIcon = document.createElement('span');
      bedIcon.className = "material-icons-outlined";
      bedIcon.innerHTML = "bed";
      bedIcon.style = "float:right;color:Blue;font-size:150%";
      const bedNum = document.createElement('span');
      bedNum.innerHTML = listingData.bed;
      bedNum.style = "float:right;color:Black;font-size:120%;padding-right:5px";
      innerContainerDiv1.appendChild(bedNum);
      innerContainerDiv1.appendChild(bedIcon);
    
    const innerContainerDiv2 = document.createElement('div');
    innerContainerDiv2.className = "clearfix";
    innerContainerDiv2.style = "padding-left:3px;padding-right:3px";

      const certCompliant = document.createElement('span');
      certCompliant.className = "material-icons-outlined";
      certCompliant.innerHTML = listingData.certified;
      certCompliant.style = "float:left;color:Gold;font-size:200%";
      innerContainerDiv2.appendChild(certCompliant);

      const innerH2L2 = document.createElement('span');
      innerH2L2.className = "material-icons-outlined info-modal-btn";
      innerH2L2.id = listingData.listingRef;
      innerH2L2.innerHTML = "paid";
      innerH2L2.style = "float:left;color:Blue;font-size:200%";
      innerH2L2.addEventListener('click', function(event) {handleInfoClicked(event.target.id);});
      innerContainerDiv2.appendChild(innerH2L2);

      const streetAddress = document.createElement('span');
      streetAddress.innerHTML = listingData.address;
      streetAddress.style = "float:left;font-size:120%";
      innerContainerDiv2.appendChild(streetAddress);
   
    outerContainerDiv.appendChild(newImage);
    outerContainerDiv.appendChild(innerContainerDiv1);
    outerContainerDiv.appendChild(innerContainerDiv2);
    
    document.getElementById('display-window').appendChild(outerContainerDiv);

    return;
  }

  function displayGallery(listingref) {

    var houseSelected = globalDatabase.find(house => house.listingRef.includes(listingref));
    currentGallery = houseSelected.gallery;
    index = 0;
    indexLength = houseSelected.gallery.length;
   
    const outerDiv = document.createElement('div');
    outerDiv.id = "outerDiv";
    outerDiv.style = "width:100%;height:100%;position:fixed;top:0;left:0;padding:0";

    const backgroundScreen = document.createElement('div');
    backgroundScreen.className = "background-gallery";
    backgroundScreen.id = "background-screen";
    outerDiv.appendChild(backgroundScreen);

    const galleryImage = document.createElement('img');
    galleryImage.className = "gallery-image";
    galleryImage.id="gallery-image";
    galleryImage.src = "https://photos.zillowstatic.com/fp/" + currentGallery[index] + 
    "-uncropped_scaled_within_1536_1152.webp";
    outerDiv.appendChild(galleryImage);

    const closeButton = document.createElement('button');
    closeButton.addEventListener('click', function() {document.getElementById('outerDiv').remove();});
    closeButton.className = "gallery-close-btn";
    closeButton.innerHTML = "&times;"
    backgroundScreen.appendChild(closeButton);

    const rightButton = document.createElement('button');
    rightButton.addEventListener('click', function() {indexImageRight(); return;});
    rightButton.className = "gallery-right-btn";
    rightButton.innerHTML = "&gt;"
    backgroundScreen.appendChild(rightButton);

    const leftButton = document.createElement('button');
    leftButton.addEventListener('click', function() {indexImageLeft(); return;});
    leftButton.className = "gallery-left-btn";
    leftButton.innerHTML = "&lt;"
    backgroundScreen.appendChild(leftButton);

    document.getElementById('mainbody').appendChild(outerDiv);

    return;
  }

  function indexImageRight() {
    if((index + 1) == indexLength){index = -1;}
    document.getElementById('gallery-image').src = "https://photos.zillowstatic.com/fp/" + currentGallery[++index] + 
    "-uncropped_scaled_within_1536_1152.webp";
    return;
  }

  function indexImageLeft() {
    if((index - 1) < 0){index = indexLength;}
    document.getElementById('gallery-image').src = "https://photos.zillowstatic.com/fp/" + currentGallery[--index] + 
    "-uncropped_scaled_within_1536_1152.webp";
    return;
  }

  function handleInfoClicked(listingref) {

    var houseSelected = globalDatabase.find(house => house.listingRef.includes(listingref));
    
    document.getElementById('exampleModalLabel').innerHTML = houseSelected.address;
    document.getElementById('modal-body').innerHTML = houseSelected.description;
    document.getElementById('modal-map-display').src = houseSelected.embedded;
    var applicantsBidMin = 0.7*houseSelected.price;
    var applicantsBidMax = 1.4*houseSelected.price;
    var applicantsBidValue = houseSelected.price;
    var currentBid = formatter.format(houseSelected.price);
    var listingReference = houseSelected.listingRef;
    
    var url = "https://script.google.com/macros/s/AKfycbxhJEUMmzML7zCszHax304FRisFc-JEuvEi-kHJhpl1qTuZC1Rpza0nSFj0It1fGHA/exec?listingref=" + listingReference + "&min=" + applicantsBidMin + "&max=" + applicantsBidMax + "&asking=" + applicantsBidValue + "&initial=" + currentBid;
    document.getElementById('submit-iframe').src = url;
    document.getElementById('modalButton').click();

    return;

  }
