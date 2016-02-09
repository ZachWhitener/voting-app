$(function(){
   
   
   // Option starts at 'Option 1'
   var optionNumber = 1;
   $('#add-option').on('click', function(e){
       e.preventDefault();
       optionNumber++; 
       
       var formGroup = '<div class="form-group"><label>Option '+optionNumber+
       '</label><input type="text" name="option" class="form-control"></div>'; 
       
       $('#newPollForm').append(formGroup).after($('#newPollForm .btn-group'));
       console.log('newPollForm button clicked');
   });
   
   $('#createPoll').on('click', function(){
       var numofoptions = $('#newPollForm').children().length - 1; 
       $('#numofoptions').val(numofoptions); 
       // Submit form
       $('#newPollForm').submit();
   })
});