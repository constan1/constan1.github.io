/**
 * @author: Andrei Constantinescu.
 * Description: All code, for better or worse, is entirely my doing.
 * Date Modified: May 4, 2021.
 */



$(document).ready(function()
{
    //A global array of MovieTitles for the current search only.
    var movieTitle =[];
     //A global array of rekease dates for the current search only.
    var movieYear = [];
    //A global array of string images for the current search only.
    var moviePoster = [];
    // A global array of appended id's to identify each result in the search - for the current search only.
    var nominate = [];
    // A global hash of Nomination_List that stores all the nominated (added) movies accross different searches.
    var Nomination_List = {};
    //The global search result
    var search;


    /**
     * This is the first searched call by default.
     * @param {string}  pirates
     */
    searchAddToNomList("pirates");

      //We trigger this when the user clicks enter after his search.

   $("#searchMovie").keypress(function(event){
       if(event.keyCode === 13)
      { 
          
        $(".main-bod").empty();
       
    search = document.getElementById("searchMovie").value;
    

    searchAddToNomList(search);

    }
 })


 /**
  * passed to the API call for searching.
  * @param {string} search 
  */

   function searchAddToNomList(search){
       
    if(search === "")
    {
        search = "pirates";
    }
    
    $.ajax({
        url:"https://www.omdbapi.com/?s="+search+"&apikey=20936c62",
   
       
    }).then(function(data){
   
      
       for(i=0; i<data.Search.length; i++){
           
           nominate[i] ="nominate"+i;
           $(".main-bod").append("<div class='col-lg-4 col-md-6 pb-4'>"+
           "<div id='"+nominate[i]+"bod'"+ "class='card bg-white rounded nombod-deselected shadow-sm' style='border:1px solid #222;'>"+
           "<div class='card-body px-3 pt-3 pb-1 row'>"+
           "<div class='col-7'><label id='title' class='text-left'>"+data.Search[i].Title+"<label></div>" +
           "<div class='col-5'><label class='float-right'><span class='text-black-50 h5'>"+
           data.Search[i].Year+"</span></label></div></div>"+
           "<div><img class='card-img-top img-fluid d-block mx-auto mb-3' src="+data.Search[i].Poster+">"+
           "</div>"+
           "<div class='card-body p-1 px-3 row'>"
           +"<div class='col-12 p-1 '><input type='button' id='"+nominate[i]+"'class='btn btn-primary nominate form-control btn-sm p-2' value='Nominate'/>"+
           "</div>"
           +"</div></div>"
           +"</div>");
   
      
             movieTitle[i] = data.Search[i].Title;
             movieYear[i]  = data.Search[i].Year;
             moviePoster[i] = data.Search[i].Poster;
   
           if(Nomination_List[movieTitle[i].toString() + movieYear[i].toString()]===(movieTitle[i] +";"+ movieYear[i] +";" + moviePoster[i]))
           {
               document.getElementById(nominate[i]).style.backgroundColor = "#0C7B52";
               document.getElementById(nominate[i]).style.color = "white";
               document.getElementById(nominate[i]+"bod").style.borderWidth = "6px";
              document.getElementById(nominate[i]+"bod").style.borderColor = "black";
              document.getElementById(nominate[i]).value = "Added!";
           }
           else if(Nomination_List[movieTitle[i].toString() + movieYear[i].toString()] === "undefined")
           {
               document.getElementById(nominate[i]).value = "Nominate";
               document.getElementById(nominate[i]).style.backgroundColor = "#007bff";
               document.getElementById(nominate[i]+"bod").style.borderWidth = "2px";  
           }
            
           
       }
   
          $(".nominate").on('click',function(){
              var index = $(".nominate").index(this);
             
              if(document.getElementById(nominate[index]).value === "Nominate")
              {
               Nomination_List[movieTitle[index].toString() + movieYear[index].toString()]=(movieTitle[index] +";"+ movieYear[index] +";" + moviePoster[index]);
   
   
              $(".nomlist").append("<a class='nomlinklist nav-link text-black' href='#' id='"+nominate[index]+"link'>"+movieTitle[index]+";"+ movieYear[index]+"</a>");
              
              document.getElementById(nominate[index]).style.backgroundColor = "#0C7B52";
              document.getElementById(nominate[index]).style.color = "white";
              document.getElementById(nominate[index]+"bod").style.borderWidth = "6px";
              document.getElementById(nominate[index]+"bod").style.borderColor = "black";
              document.getElementById(nominate[index]).value = "Added!";
              document.getElementById(nominate[index]).disabled = true;
     
              }
           
   
              var nomlist = $(".nomlinklist")
              $(".nomlist").find(nomlist).on('click',function()
              {    
                   var selectionindex = nomlist.index(this);
                   var selection = document.getElementsByClassName("nomlinklist")[selectionindex].textContent;
                   var resultSelection = selection.split(";",2);
                   var NominationListSplit = Nomination_List[resultSelection[0] + resultSelection[1]];
                   var NominationListSplitResult = NominationListSplit.split(";",3);
   
                   
                
                   Swal.fire({
                      
                       html: "<div class='row nom-bod'><div class='col-lg-4 col-md-6 pb-4'>"+
                       "<div id='nomRemove'"+ "class='card bg-white rounded shadow-sm' style='border:1px solid #222;'>"+
                       "<div class='card-body px-3 pt-3 pb-1 row'>"+
                       "<div class='col-7'><label id='title' class='text-left'>"+NominationListSplitResult[0]+"<label></div>" +
                       "<div class='col-5'><label class='float-right'><span class='text-black-50 h5'>"+
                       NominationListSplitResult[1]+"</span></label></div></div>"+
                       "<div><img class='card-img-top img-fluid d-block mx-auto mb-3' src="+NominationListSplitResult[2]+">"+
                       "</div>"+
                       "<div class='card-body p-1 px-3 row'>"
                       +"<div class='col-12 p-1 '><input type='button' id='nominate-1' class='btn btn-primary nominate-2 form-control btn-sm p-2' disabled value='Remove'/>"+
                       "</div>"
                       +"</div></div>"
                       +"</div></div>",
                       showCancelButton: true,
                       confirmButtonText: 'Remove it!',
                       cancelButtonText: 'Cancel!',
                       reverseButtons: true,
                       icon:'success'
                   }).then((result) => {
                       if (result.isConfirmed) {
   
                           for(i=0 ; i<movieTitle.length; i++)
                           {
                                   if( NominationListSplitResult[0] + NominationListSplitResult[1] === movieTitle[i] + movieYear[i])
                                   {
                                       document.querySelectorAll('.nomlinklist')[selectionindex].style.display= 'none';
                                       document.getElementById(nominate[i]).value = "Nominate";
                                       
                                        document.getElementById(nominate[i]).style.backgroundColor = "#007bff";
                                        document.getElementById(nominate[i] + "bod").style.borderWidth = "2px";  
                                       document.getElementById(nominate[i]).disabled = false;
   
                                       delete  Nomination_List[resultSelection[0] + resultSelection[1]];
   
                                       break;
                                   }
                                   else {
                                       document.querySelectorAll('.nomlinklist')[selectionindex].style.display= 'none';
                                       delete  Nomination_List[resultSelection[0] + resultSelection[1]];
                                   }
                           }
   
                       } else if (
                         /* Read more about handling dismissals below */
                         result.dismiss === Swal.DismissReason.cancel
                       ) {
                       
                       }
                     })
                       document.getElementById("nominate-1").style.backgroundColor = "#0C7B52";
                       document.getElementById("nominate-1").style.color = "white";
                       document.getElementById("nominate-1").value = "Added!";
                        document.getElementById("nomRemove").style.borderWidth = "6px";
                       document.getElementById("nomRemove").style.borderColor = "black";  
              })
   
                  
           })
   
          })
   }


})
