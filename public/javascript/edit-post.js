//need document.querySelectorAll to select all edit buttons
const editComment = document.querySelectorAll('.edit-note-btn')

//need document.querySelectorAll to select all delete buttons
const deleteComment = document.querySelectorAll('.delete-note-btn')


// FUNCTION TO EDIT POSTS
async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const postText = document.querySelector('input[name="post-text"]').value.trim();
    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];

   const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title, 
          postText
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }

  
  }
  // add eventListener to edit post
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

  // FUNCTION FOR EDIT BUTTONS IN COMMENT SECTION
  // now loop over each comment in function
  editComment.forEach((editButton) => {
      // select the comment ID for this note
      const commentID = editButton.getAttribute('data-commentID')
  
      // add event listener to each button to edit note when clicking 'edit' button
      editButton.addEventListener('click', async () => {
        // traversing DOM to div class='button'. Adding new sibling to this which is a text input html element  
        const buttonParent = editButton.parentElement
        // create a new html input element to add infront of the buttonParent
        const inputEl = document.createElement('input')
        // add new input element in front of buttonParent
        buttonParent.prepend(inputEl)
        
        // WHEN EDIT BUTTON IS CLICKED, DISPLAY SAVE and ABORT-EDIT BUTTONS and HIDE EDIT and DELETE BUTTONS
        // selects and hides edit button when edit button is clicked
        editButton.style.display = 'none'
        // select and hide delete button when edit button is clicked
        const deleteBtn = editButton.nextElementSibling
        deleteBtn.style.display = "none"
        // now select and show the save button when edit button is clicked
        const saveBtn = deleteBtn.nextElementSibling
        saveBtn.style.display = "inline"
       // now select and show abort-edit button when edit button is clicked
        const abortEditBtn = saveBtn.nextElementSibling
        abortEditBtn.style.display = "inline"
        
        // addEventListener for save button
        saveBtn.addEventListener('click', async() => {
          // assign inputEl.value to variable
          const editCommentText = inputEl.value
          
        // PUT request to update note when save button is clicked
        const response = await fetch(`/api/comments/${commentID}`, {
                method: 'PUT',
                body: JSON.stringify({
                  editCommentText
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            
              if (response.ok) {
                alert('Comment Changed')
                document.location.reload(); //this reloads page when comment is edited
              } else  {
                alert(response.statusText);
              }
            });
  
            // add eventListener for abort-edit button
            abortEditBtn.addEventListener('click', async() => {
              document.location.reload();
            })
        });  
        
     }); 

// FUNCTION FOR DELETE BUTTONS IN COMMENT SECTION
// now loop over each comment
deleteComment.forEach((deleteBtn) => {
  // select the comment ID for this note
  const commentID = deleteBtn.getAttribute('data-commentID')

  // add event listener to each button to delete comment when clicking 'delete' button
  // using callback function in event listener because I don't know how to do it any other way
  deleteBtn.addEventListener('click', async () => {
     const response = await fetch(`/api/comments/${commentID}`, {
        method: 'DELETE'
      });
    
      if (response.ok) {
        alert('Comment Deleted')
        document.location.reload(); //this reloads page with comment deleted
      } else {
        alert(response.statusText);
      }
    
  })
}) 