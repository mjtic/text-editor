const butInstall = document.getElementById('buttonInstall');

/*
https://web.dev/codelab-make-installable/
Listen for the beforeinstallprompt event #
When the browser fires the beforeinstallprompt event, that's the indication that the Progressive Web App can be installed and an install button can be shown to the user. The beforeinstallprompt event is fired when the PWA meets the installability criteria.

Click Remix to Edit to make the project editable.
Add a beforeinstallprompt event handler to the window object.
Save the event as a global variable; we'll need it later to show the prompt.
Unhide the install button.
*/

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
   // Prevent the mini-infobar from appearing on mobile.
   event.preventDefault();
   console.log('👍', 'beforeinstallprompt', event); 
   // Stash the event so it can be triggered later.
   window.deferredPrompt = event;
   // Remove the 'hidden' class from the install button.
   butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
/*
 To show the install prompt, call prompt() on the
  saved beforeinstallprompt event. 
  Calling prompt() is done in the install button 
  click handler because prompt() must be called 
  from a user gesture.
*/

butInstall.addEventListener('click', async () => {
 console.log('👍', 'butInstall-clicked');
 const promptEvent = window.deferredPrompt;
 if(!promptEvent){
  // The deferred prompt isn't available.
    return;
 }
  // Show the install prompt.
  promptEvent.prompt();
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button.
  butInstall.classList.toggle('hidden', true);
});


// TODO: Add an handler for the `appinstalled` event
/*
Installing a Progressive Web App through an install 
button is only one way users can install a PWA. 
They can also use Chrome's menu, the mini-infobar,
 and through an icon in the omnibox. 
 You can track all of these ways of installation 
 by listening for the appinstalled event.
*/
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});
