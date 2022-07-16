public with sharing class vehicalController {
    public vehicalController() {

    }

    @AuraEnabled
    public static Vehical__c createVehical(Vehical__c vehObj){
        try {

            insert vehObj;
            return vehObj;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static List<Vehical__c> craete_Vehicals(List<Vehical__c> objvehicalsList)
    {
        try {

            insert objvehicalsList;
            return objvehicalsList;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}