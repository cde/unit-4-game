$( document ).ready(function() {
    collector.generateRandomNumber();
    collector.generateCrystalNumbers();
    generateNumbers();
    $("button").on("click",crystal.addPoints);
});
var resetValues = false;

var collector = {
    totalPoints: 0,
    wins: 0,
    losses: 0,
    crystals:  $('#crystals').children(),
    randomNumber: 0,

    generateRandomNumber: function(){
        collector.randomNumber = Math.floor(Math.random()*101+19)
        $('.random-number').text(collector.randomNumber );
        return collector.randomNumber;
    },

    generateCrystalNumbers: function(){
        var numbers =[];
        this.crystals.each(function(){
            // Number on the cristal are randomly generated between 1 & 12
            var button = $(this);
            var generatedNumber = Math.floor(Math.random()*11+1);
            // var generatedNumber = Math.round((Math.random()*24)/2)+1;
            numbers.push(generatedNumber);
            button.data('number', generatedNumber);
        })
    },
    
    reset: function(){
        collector.totalPoints = 0;
        $('#total-points').text(collector.totalPoints);
        collector.generateRandomNumber() ;
        generateNumbers()
    }

}

var crystal = {
    name: $(this).attr('id'),

    addPoints: function(){
        // Accumulate points
        var crystalPoints = $(this).data('number');
        collector.totalPoints += crystalPoints;
        $('#total-points').text(collector.totalPoints);
        // Check wins & losses
        crystal.checkWins();
        if(!resetValues){
            crystal.checkLosses();
        }

    },
    checkWins: function(){
        if(collector.totalPoints === collector.randomNumber){
            collector.wins++; 
            $('#wins').text(collector.wins);
            collector.reset();
            resetValues = true;
        }else {
            resetValues = false;
        }
            
    },
    checkLosses: function(){
        if(collector.totalPoints > collector.randomNumber){
            collector.losses++; 
            $('#losses').text(collector.losses);
            collector.reset();
        }
    }
}
 
