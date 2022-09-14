
//need document.querySelectorAll to select all delete buttons
const deleteComment = document.querySelectorAll('.delete-comment-btn')

// now loop over each note
deleteComment.forEach((deleteBtn) => {
  // select the comment ID for this note
  const commentID = deleteBtn.getAttribute('data-commentID')

  // add event listener to each button to delete note when clicking 'delete' button
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