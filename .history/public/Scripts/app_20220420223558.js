// IIFE

(function () {
    
    function Start()
    {
        console.log("Web pages displayed...");

        let deleteButtons = document.querySelectorAll('.btn-danger');
        // prevents the automatic deletion 
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Delete the selected row?")) 
                {
                    event.preventDefault();
                    window.location.assign('/order-list');
                }
            });
        }
    }



    
    window.addEventListener("load", Start); 

})();