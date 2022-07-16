import { LightningElement,track } from 'lwc';
import craete_Vehicals from '@salesforce/apex/vehicalController.craete_Vehicals';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class MultipleVehicle_insert extends LightningElement {

    @track keyIndex=1;
    @track message;
    @track error;
    @track vehicalList=[{
        VehicalNo__c:'',
        VehicalType__c:'',
        MemberShip__c:'',
        Vehical_Owner__c:''


    }];


    changehandler(event)
    {
        if(event.target.name==='vehicalNo')
        {
            this.vehicalList[event.target.accessKey].VehicalNo__c= event.target.value;

        }
        else if(event.target.name==='vehicalOnwer')
        {
            this.vehicalList[event.target.accessKey].Vehical_Owner__c = event.target.value;

        }
        else if(event.target.name==='vehicalType')
        {
            this.vehicalList[event.target.accessKey].VehicalType__c= event.target.value;

        }

        else if(event.target.name==='MemberShip')
        {
            this.vehicalList[event.target.accessKey].MemberShip__c= event.target.value;

        }
    }

    addRow()
    {
        this.keyIndex+1;
        this.vehicalList.push({
            VehicalNo__c:'',
            VehicalType__c:'',
            MemberShip__c:'',
            Vehical_Owner__c:''


        });



    }

    removeRow(event)
    {
        if(this.vehicalList.length>=1)
        {
            this.vehicalList.splice(event.target.accessKey,1);
            this.keyIndex-1;
        }

    }

    saveMultipleVehical()
    {
        craete_Vehicals({objvehicalsList: this.vehicalList})
        .then(result=>{
            this.message=result;
            this.error=undefined;
            this.vehicalList.forEach(function(item){
                item.VehicalNo__c='';
                item.Vehical_Owner__c='';
                item.VehicalType__c='';
                item.MemberShip__c='';
            });

            if(this.message!==undefined)
            {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title:'Success',
                        message: 'Vehicals Created',
                        varaint:'success',
                    }),
                );
            }
            
        })
        .catch(error=>{
            this.message=undefined;
            this.error=error;
        });

    }

}