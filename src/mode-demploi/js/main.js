// ------------------ HOME --------------------- 
// --------------------------------------------- 

//             MENU              //
$('.menu-home li > span').on('click', function(){
  if($(this).parent('li').hasClass('active')){
    $(this).parent('li').removeClass('active');
    $(this).find('.menu-plus').html('+');
  }
  else{
    $(this).parent('li').addClass('active');
    $(this).find('.menu-plus').html('-');
  }
});

// sticky menu

if($('body').hasClass('home')){
  var stickyNavTop = $('.menu-home').offset().top;

  // our function that decides weather the navigation bar should have "fixed" css position or not.
  var stickyNav = function(){
    var scrollTop = $(window).scrollTop(); // our current vertical position from the top
         
    // if we've scrolled more than the navigation, change its position to fixed to stick to top,
    // otherwise change it back to relative
    if (scrollTop > stickyNavTop) { 
        $('.menu-home').addClass('sticky');
    } else {
        $('.menu-home').removeClass('sticky'); 
    }
  };

  stickyNav();
  // and run it again every time you scroll
  $(window).scroll(function() {
    stickyNav();
  });
}

// AJOUTER des + aléatoirement sur la home
addPlus($('#container-menu-pres '), 100, 300);

// ------------------ FIN HOME --------------------- 
// -------------------------------------------------

// AJOUTER des + aléatoirement sur les articles
addPlus($('section'), 100, 400);


function addPlus(element, min, max){
  var plusNumber = Math.floor(Math.random()*max + min);
  var articleHeight = $('body').height();
  var articleWidth = $('body').width();
  console.log(articleHeight);
  for(var i=0; i<=plusNumber; i++){
    var randomX = Math.floor(Math.random()*articleWidth);
    var randomY = Math.floor(Math.random()*articleHeight);
    var plus = '<div class="plus" style="top:'+randomY+'px; left:'+randomX+'px;">+</div>';
    element.append(plus);
  }
}


// Notes de côté de page

const footnotes = document.querySelectorAll( '.footnote' );
for ( const footnote of footnotes ) {
  const parentElement = footnote.parentElement;
  const footnoteCall = document.createElement( 'a' );
  const footnoteNumber = footnote.dataset.notenumber;

  footnoteCall.className = 'footnote-ref'; // same class as Pandoc
  footnoteCall.setAttribute( 'id', `fnref${ footnoteNumber}` ); // same notation as Pandoc
  footnoteCall.setAttribute( 'href', `#${ footnote.id}` );
  footnoteCall.innerHTML = `<sup id="note-content-pointer-${ footnote.id }">${ footnoteNumber }</sup>`;
  parentElement.insertBefore( footnoteCall, footnote );

  // Here comes a hack. Fortunately, it works with Chrome and FF.
  const handler = document.createElement( 'div' );
  handler.className = 'footnoteHandler';
  parentElement.insertBefore( handler, footnote );
  handler.appendChild( footnote );
  handler.style.display = 'inline-block';
  handler.style.width = '100%';
  handler.style.float = 'right';
  handler.style.margin = '0';
}


for ( const footnote of footnotes ) {
  footnoteIndex = footnote.getAttribute('data-notenumber');
  const handler = footnote.parentElement;

  const footnoteCall = document.getElementById( `note-content-pointer-${ footnote.id}` );
  if ( footnoteCall ) {
    footnoteCall.innerHTML = `<sup id="note-content-pointer-${ footnote.id }">${ footnoteIndex }</sup>`;
  }

  footnote.innerHTML = `${footnote.id ? `<span class="note-pointer"><a href="#note-content-pointer-${ footnote.id }">${ footnoteIndex }.</a></span>` : ''}${ footnote.innerHTML}`;
  footnote.style.display = 'block';
}

let notes = document.querySelectorAll( '.footnote' );
let noteOverflow = false;
let notesHeightAll = [];

if (typeof (notes) != 'undefined' && notes != null && notes.length != 0) {

  for (let n = 0; n < notes.length; ++n) {
    // Display notes of the page 
    notes[n].style.display = "inline-block";
    // Add height of the notes to array notesHeightAll 
    let noteHeight = notes[n].offsetHeight;
    notesHeightAll.push(noteHeight);
    // Add margins of the notes to array notesHeightAll 
    if (n >= 1) {
      let margins = biggestMargin(notes[n - 1], notes[n]);
      notesHeightAll.push(margins);
    }
  }


  /* FIT PAGE ------------------------------------------------------------------------------------- */

  // Calculate if all notes fit on the page;
  let reducer = (accumulator, currentValue) => accumulator + currentValue;
  let allHeight = notesHeightAll.reduce(reducer);
  let maxHeight = document.body.offsetHeight;

  if (allHeight > maxHeight) {
    // console.log("doesn't fit");

    /* IF DOESN'T FIT ----------------------------------------------------------------------------- */

    // positions all the notes one after the other starting from the top
    notes[0].style.top = parseInt(window.getComputedStyle(notes[0]).marginBottom, 10) * -1 + "px";
    for (let a = 1; a < notes.length; ++a) {
      let notePrev = notes[a - 1];
      let newMargin = biggestMargin(notePrev, notes[a]);
      let newTop = notePrev.offsetTop + notePrev.offsetHeight - marginNoteTop(notes[a]) + newMargin + 5 ;
      notes[a].style.top = newTop + "px";
    }
    noteOverflow = true;

  } else {
    /* PUSH DOWN ---------------------------------------------------- */
    for (let i = 0; i < notes.length; ++i) {
      if (i >= 1) {
        let noteTop = notes[i].offsetTop;
        let notePrev = notes[i - 1];
        let newMargin = biggestMargin(notes[i], notePrev);
        let notePrevBottom = notePrev.offsetTop - marginNoteTop(notePrev) + notePrev.offsetHeight + newMargin + 5;
        // Push down the note to bottom if it's over the previous one 
        if (notePrevBottom > noteTop) {
          // console.log("overflow");
          notes[i].style.top = notePrevBottom +  "px";
        }
      }
    }

    /* PUSH UP ---------------------------------------------- */

    // Height of the page content 
    let contentHeight = document.body.offsetHeight;

    // Check if last note overflow 
    let nbrLength = notes.length - 1;
    let lastNote = notes[nbrLength];
    let lastNoteHeight = lastNote.offsetHeight + marginNoteTop(lastNote);
    let noteBottom = lastNote.offsetTop + lastNoteHeight;

    if (noteBottom > contentHeight) {

      // Push up the last note 
      lastNote.style.top = contentHeight - lastNoteHeight - 13 + "px";

      // Push up previous note(s) if if it's over the note
      for (let i = nbrLength; i >= 1; --i) {
        let noteLastTop = notes[i].offsetTop;
        let notePrev = notes[i - 1];
        let notePrevHeight = notePrev.offsetHeight;
        let newMargin = biggestMargin(notePrev, notes[i]);
        let notePrevBottom = notePrev.offsetTop + notePrev.offsetHeight + newMargin + 13;
        if (notePrevBottom > noteLastTop) {
          notePrev.style.top = notes[i].offsetTop - marginNoteTop(notePrev) - notePrevHeight - newMargin - 17 + "px";
        }
      }

    } /* end push up */

  }

}

function biggestMargin(a, b) {
  let margin;
  let marginBottom = marginNoteBottom(a);
  let marginTop = marginNoteTop(b);
  if (marginBottom > marginTop) {
    margin = marginBottom;
  } else {
    margin = marginTop;
  }
  return margin;
}

function marginNoteTop(elem) {
  let marginTop = parseInt(window.getComputedStyle(elem).marginTop, 10)
  return marginTop;
}

function marginNoteBottom(elem) {
  let marginBottom = parseInt(window.getComputedStyle(elem).marginBottom, 10)
  return marginBottom;
}



