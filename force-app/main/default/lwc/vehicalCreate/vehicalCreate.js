import { LightningElement, track } from 'lwc';
import createVehical from '@salesforce/apex/vehicalController.createVehical';
import VEHICALNO from '@salesforce/schema/Vehical__c.VehicalNo__c';
import VEHICALTYPE from '@salesforce/schema/Vehical__c.VehicalType__c';
import VEHICALOWNER from '@salesforce/schema/Vehical__c.Vehical_Owner__c';
import MEMBERSHIP from '@salesforce/schema/Vehical__c.MemberShip__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class VehicalCreate extends LightningElement {

    @track VehicalId;
    @track errors;
    value = ['true'];

    @track vehicalRecord={

        VehicalNo__c:VEHICALNO,
        VehicalType__c:VEHICALTYPE,
        Vehical_Owner__c:VEHICALOWNER,
        MemberShip__c:MEMBERSHIP
    };


    get options() {
        return [
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' }
           
           
        ];
    }

    handleChange(e) {
        this.vehicalRecord.MemberShip__c = e.detail.value;
    }

    handleVehicalNoChange(event)
    {
        this.vehicalRecord.VehicalNo__c=event.target.value;
    }

    handleVehicalOwnChange(event)
    {
        this.vehicalRecord.Vehical_Owner__c=event.target.value;
        this.vehicalRecord.VehicalType__c='Private';
    }

    handleSaveVehical()
    {
        createVehical({vehObj:this.vehicalRecord})
        .then(result=>{
            this.VehicalId=result.Id;
            const toastEvent= new ShowToastEvent({
                this : 'Success',
                message: 'Vehical is Created',
                variant: 'success'

            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error=>{
            this.errors=error.message;
        });

    }


}