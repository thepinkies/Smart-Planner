Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};

function uploadFile()
{
    document.getElementById("uploadBtn").onchange = function ()
    {
        document.getElementById("uploadFile").value = this.value;
    };

}


//google.setOnLoadCallback(function()
//{});
//
//
//google.load('visualization', '1', {packages: ['corechart']});


google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(function(){});

var app = angular.module('SocialEngineering', ['ngMaterial', 'ngSanitize', 'ngCsv', 'ngMessages', 'ngRoute']);

app.config(function ($httpProvider, $mdThemingProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('blue-grey').backgroundPalette('grey');
});

/*LandingController controls the Landing Templates*/

app.controller('LandingController',['$mdDialog', '$http', '$window', function($mdDialog, $http, $window) {


    landingTemplate = this;

    landingTemplate.newLandingTemplate = {
        name: null,
        splash_template_string: null,
        landing_template_string: null,
    };

    $http.get('/emails/api/landingtemplates/').success(function (response)
    {
        landingTemplate.landing = response;
        return landingTemplate.landing;
    });


   landingTemplate.updateTemplate = function(ev, landTemp)
   {
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to update?')
            .content('Press Confirm to continue with the update. Otherwise, press Cancel to stop!')
            .ariaLabel('Update Landing Template')
            .ok('Update')
            .cancel('Cancel')
            .targetEvent(ev);

        $mdDialog.show(confirm).then(function()
        {

            $http.put('/emails/api/landingtemplates/' + landTemp.pk + '/', landTemp).success(function(response)
            {
                landingTemplate.newResponse = response;
                landingTemplate.alert = 'Update was successfully made!'

                $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('The following landing template has been successfully updated!')
                    .content(response.name)
                    .ariaLabel('Update Landing Template Alert')
                    .ok('Okay')
                    .targetEvent(ev));

                $window.location.reload();

            }).error(function(response)
            {
                $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Please select a Landing Template to update!')
                    .content()
                    .ariaLabel('Error Landing')
                    .ok('Okay')
                    .targetEvent(ev));

            });
        }, function(){});
   };

   landingTemplate.addNew = function(ev)
   {
        var confirm = $mdDialog.confirm()
        .title('Would you like to update?')
        .content('Changes made will be posted into databases.')
        .ariaLabel('Create New Landing Template')
        .ok('Create')
        .cancel('Cancel')
        .targetEvent(ev);

        $mdDialog.show(confirm).then(function()
        {
           $http.post('/emails/api/landingtemplates/', landingTemplate.newLandingTemplate).success(function(response)
            {
                 $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Success! The following Landing Template has been made!')
                        .content(landingTemplate.newLandingTemplate.name)
                        .ariaLabel('Error Zero')
                        .ok('Okay')
                        .targetEvent(ev));

            }).error(function(response){

                landingTemplate.errorMessage = response;

                if(landingTemplate.errorMessage.name[0] == 'landing template with this name already exists.')
                {
                     $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('That name already exists! Please try another one.')
                            .content()
                            .ariaLabel('Error One')
                            .ok('Okay')
                            .targetEvent(ev));
                }
                else
                {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Uh oh! Please complete the whole form.')
                            .content()
                            .ariaLabel('Error Two')
                            .ok('Okay')
                            .targetEvent(ev));
                }
            });

        }, function(){});

   };

   landingTemplate.deleteTemplate = function(ev, landTemp)
   {
        var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete?')
        .content('Are you sure you want to delete' + landTemp.name + '?')
        .ariaLabel('Delete Landing Template')
        .ok('Delete')
        .cancel('Cancel')
        .targetEvent(ev);

        $mdDialog.show(confirm).then(function()
        {
            landingTemplate.beforeDelete = landTemp.name;

            $http.delete('/emails/api/landingtemplates/' + landTemp.pk + '/', landTemp).success(function(response){
                $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Success!')
                            .content('Landing Template, ' + landingTemplate.beforeDelete + ', has been deleted.')
                            .ariaLabel('Delete Success')
                            .ok('Okay')
                            .targetEvent(ev));

                landingTemplate.beforeDelete = null;

            }).error(function(response){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Uh oh!')
                            .content('There was an issue deleting' + landingTemplate.beforeDelete)
                            .ariaLabel('Delete Error')
                            .ok('Okay')
                            .targetEvent(ev));
            });

        }, function(){

        });
   };

}]);

/*
EmailTemplateController controls the flow of data being passed back and forth from Django RESTful framework
*/

app.controller('EmailTemplateController', ['$http', '$mdDialog', '$route', function($http, $mdDialog, $route){

    emailTemplate = this;

    emailTemplate.newEmailTemplate = {
        name: null,
        subject: null,
        body_html: null,
        body_text: null,
    };

    $http.get('/cs480/testing').success(function(response)
    {
        emailTemplate.eTemplates = response;
        return emailTemplate.eTemplates;
    });

    emailTemplate.updateTemplate = function(ev, emailTemp)
    {
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to update?')
            .content('Press Confirm to continue with the update. Otherwise, press Cancel to stop!')
            .ariaLabel('Update Landing Template')
            .ok('Update')
            .cancel('Cancel')
            .targetEvent(ev);

        $mdDialog.show(confirm).then(function()
        {

            $http.put('/emails/api/emailtemplates/' + emailTemp.id + '/', emailTemp).success(function(response)
            {
                emailTemplate.newResponse = response;
                return emailTemplate.newResponse;
            });

        });
    };

    emailTemplate.addNew = function(ev)
    {
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to create ' + emailTemplate.newEmailTemplate.name + "?")
            .content('Press Create to continue, or press Cancel to stop.')
            .ariaLabel('Update Landing Template')
            .ok('Update')
            .cancel('Cancel')
            .targetEvent(ev);

        $mdDialog.show(confirm).then(function()
        {

            $http.post('/emails/api/emailtemplates/', emailTemplate.newEmailTemplate).success(function(response)
            {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Success!')
                        .content('Your email template ' + emailTemplate.newEmailTemplate.name + ' has been created!')
                        .ariaLabel('Create Success')
                        .ok('Okay')
                        .targetEvent(ev));


                emailTemplate.newEmailTemplate.name = null;
                emailTemplate.newEmailTemplate.subject = null;
                emailTemplate.newEmailTemplate.body_html = null;
                emailTemplate.newEmailTemplate.body_text = null;

                $route.reload();

            }).error(function(response)
            {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Uh oh! Please complete the form.')
                        .content()
                        .ariaLabel('Create Error')
                        .ok('Okay')
                        .targetEvent(ev));
            });
        });
    };

    emailTemplate.deleteTemplate = function(ev, emailTemp)
    {
        var confirm = $mdDialog.confirm()
            .title('WARNING!')
            .content('Are you sure you want to delete ' + emailTemp.name + ' ? Deleting this template will also delete campaigns tied by its foreign key. \n To avoid campaign deprecation, change the affiiliated email template to another one.')
            .ariaLabel('Delete Email Template')
            .ok('Delete')
            .cancel('Cancel')
            .targetEvent(ev);

        emailTemplate.beforeDelete = emailTemp.name;

        $mdDialog.show(confirm).then(function()
        {

            $http.delete('/emails/api/emailtemplates/' + emailTemp.id + '/').success(function(response)
            {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Success!')
                        .content('Your email template ' + emailTemplate.beforeDelete + ' has been deleted!')
                        .ariaLabel('Create Success')
                        .ok('Okay')
                        .targetEvent(ev));

                emailTemplate.beforeDelete = null;

            }).error(function(response)
            {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Uh oh! Please select an email template to delete.')
                        .content()
                        .ariaLabel('Delete Error')
                        .ok('Okay')
                        .targetEvent(ev));
            });

        });
    };

}]);

/*EditCampaignController controls the flow od ata being passed
 back and forth from Django RESTful framework*/

app.controller('EditCampaignController', ['$http', '$mdDialog', function($http, $mdDialog)
{
    campaign = this;

    campaign.testArray = [];

    campaign.newCampaign = {
        name: "",
        client_name: "",
        sending_address: "",
        email_template: null,
        landing_template: null,
        domain: "70.168.249.155",
        payload: null,
        status: "new",
        path: "collect",
    };

    $http.get('/emails/api/campaignlist/').success(function(response)
    {
        campaign.allCampaign = response;
        return campaign.allCampaigns;
    });


    $http.get('/emails/api/landingtemplates/').success(function (response)
    {
        campaign.landing = response;
        return campaign.landing;
    });


    $http.get('/emails/api/emailtemplates/').success(function (response)
    {
        campaign.emailTemplates = response;
        return campaign.emailTemplates;
    });

    campaign.getCampaign = function(campaign)
    {
        $http.get('/emails/api/campaignlist/' + campaign.id + '/').success(function(response)
        {
            campaign.campaignDetail = response;

            $http.get('emails/api/emailtemplates/' + campaign.campaignDetail.email_template + '/').success(function(response)
            {
                campaign.affiliatedEmail = response;
            });

            $http.get('emails/api/landingtemplates/' + campaign.landing_template + '/').success(function(response)
            {
                campaign.affiliatedLanding = response;

            });

        });

    };

    campaign.addNew = function(ev)
    {
        $http.post('/emails/api/campaignlist/', campaign.newCampaign).success(function(response)
        {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Success! Campaign ' + campaign.newCampaign.name + ' successfully created!')
                    .content()
                    .ariaLabel('Create Success')
                    .ok('Okay')
                    .targetEvent(ev));

            campaign.newCampaign.name = "";
            campaign.newCampaign.client_name = "";
            campaign.newCampaign.email_template = null;
            campaign.newCampaign.landing_template = null;
            campaign.newCampaign.domain = "70.168.249.155";
            campaign.newCampaign.payload = null;
            campaign.newCampaign.status = "new";
            campaign.newCampaign.path = "collect";

        }).error(function(response)
        {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Uh oh! Please complete the form.')
                    .content()
                    .ariaLabel('Create Error')
                    .ok('Okay')
                    .targetEvent(ev));
        });

    };


    campaign.update = function(ev, updatedCampaign)
    {

       $http.put('/emails/api/campaignlist/' + updatedCampaign.id + '/', updatedCampaign).success(function(response)
        {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Success! Campaign ' + campaign.newCampaign.name + ' successfully created!')
                    .content()
                    .ariaLabel('Create Success')
                    .ok('Okay')
                    .targetEvent(ev));

        }).error(function(response)
        {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Uh oh! Please complete the form.')
                    .content()
                    .ariaLabel('Create Error')
                    .ok('Okay')
                    .targetEvent(ev));
        });

    };


}]);

app.controller('ReportController', function ($http) {
    rm = this;
    this.campaign = {};
    this.results = null;
    this.selectedCampaign = null;
    this.somethingSelected = false;
    this.loaded = false;
//    this.selectedResults = [];
    this.header = [];
    rm.exportFileName = "Campaign_Results.csv";

    this.drawEmailPieChart = function () {
//        wrapper = new google.visualization.ChartWrapper({
//        chartType: 'PieChart',
//        dataTable: [['Clicked', 'Count'],
//                    ["Not Clicked ", (rm.selectedCampaign.target_count-rm.selectedCampaign.distinct_email_link_click_count)],
//                    ["Clicked ", rm.selectedCampaign.distinct_email_link_click_count]],
//        options: {pieHole: 0.4},
//        containerId: 'piediv2'});
//        wrapper.draw();


        var data = google.visualization.arrayToDataTable([
            ['Clicked', 'Count'],
            ["Not Clicked ", (rm.selectedCampaign.target_count-rm.selectedCampaign.distinct_email_link_click_count)],
            ["Clicked ", rm.selectedCampaign.distinct_email_link_click_count]
        ]);

        var options = {
          title: 'Percentages Emails Clicked',
          is3D: true,
            width: 1200,
            height: 500,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d0'));
        chart.draw(data, options);

    }

    this.drawCredPieChart = function () {

//        wrapper = new google.visualization.ChartWrapper({
//        chartType: 'PieChart',
//        dataTable: [['Clicked', 'Count'],
//                ["Not Clicked ", (rm.selectedCampaign.target_count-rm.selectedCampaign.distinct_credential_link_click_count)],
//                ["Clicked ", rm.selectedCampaign.distinct_credential_link_click_count]],
//        options: {pieHole: 0.4},
//        containerId: 'piediv2'});
//        wrapper.draw();

        var data = google.visualization.arrayToDataTable([
            ['Clicked', 'Count'],
            ["Not Clicked ", (rm.selectedCampaign.target_count-rm.selectedCampaign.distinct_credential_link_click_count)],
            ["Clicked ", rm.selectedCampaign.distinct_credential_link_click_count]
        ]);

        var options = {
          title: 'Percentages Credential Collected',
          is3D: true,
          width: 1200,
            height: 500,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d1'));
        chart.draw(data, options);
    }

    this.toggleActive = function (selCampaign)
    {
       if (selCampaign.status === 'active')
       {
           selCampaign.status = 'inactive';
       }
       else
       {
        selCampaign.status= 'active'
       }

       $http.patch('/emails/api/campaigns/' + selCampaign.name + "/", {"status": selCampaign.status} ).success(function(response){
       });
    }

    this.selectCampaign = function (selCampaign)
    {
        rm.selectedCampaign = selCampaign;

        $http.get('emails/api/campaigns/' + selCampaign.name + "/").success(function(response)
        {
            rm.totalEmails = response.target_emails.length;
            rm.campaign = response;
            rm.drawEmailPieChart();
            rm.drawCredPieChart();
        });

        $http.get('/emails/api/results/' + selCampaign.name + '/').success(function (response)
        {
            rm.results = response;
            rm.selectedResults = [];
            rm.header = [];

            rm.loaded = true;

            rm.somethingSelected = true;
            var emails = [];

            var resultList = {};

            for (var i = 0; i < rm.results.length; i++) {
                emails.push(rm.results[i].target.email_address);
            }

            for (var i = 0; i < rm.results.length; i++)
            {
                if(rm.results != null)
                {
                    resultList = angular.extend({}, rm.results[i].target, rm.results[i]);
                    delete resultList.id;
                    delete resultList.comments;
                    delete resultList.target;
                    delete resultList.campaign_run;
                    rm.selectedResults.push(resultList);
                }
            }

            rm.header = Object.keys(resultList);
        });

    }
    this.isSelected = function ()
    {
        return this.somethingSelected;
    }

    this.deselect = function ()
    {
        this.somethingSelected = false;
        this.selectedCampaign = null;
        this.results = null;
    }

});

app.controller('NavController', ['$mdSidenav', function ($mdSidenav) {

    this.sideNavTab = 'send_emails'

    this.selectNavTab = function (setTab)
    {
        this.sideNavTab = setTab;
    }
    this.isSelected = function (checkTab)
    {
        return this.sideNavTab === checkTab;
    }
    this.toggleSidenav = function (menuId)
    {
        $mdSidenav(menuId).toggle();
    };
}]);

app.controller('CampaignController', ['$mdSidenav', '$http', '$mdDialog', '$route', function CampaignController ($mdSidenav, $http, $mdDialog, $route) {

    that = this;

    that.emailArray = [];

    $http.get('/emails/api/campaigns/').success(function (response)
    {
        that.campaigns = response;
    });


    this.sending = false;
    this.selected = null;
    that.resend = false;


    this.send_emails = function (ev, campaign, resend)
    {
        this.sending = true;

        var confirm = $mdDialog.confirm()
            .title('Send Emails to ' + campaign.name + '?')
            .content(campaign)
            .ariaLabel('Delete Campaign')
            .ok('Send')
            .cancel('Cancel')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function(){

            $http.post('/emails/trigger/', {campaign: campaign, resend: resend}).success(function (response) {
            that.sending = false;
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Emails Sent')
                    .content()
                    .ariaLabel('Email Send Alert')
                    .ok('Send')
                    .targetEvent(ev));
             }).error(function (response) {
            that.sending = false;
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Emails Failed to Send')
                    .content(response.data)
                    .ariaLabel('Email Send Alert')
                    .ok('Got it!')
                    .targetEvent(ev)
            );
        });
        });
    };


    this.filterCampaign = function(selectedCampaign)
    {

        $http.get('/emails/api/targetemails/' + selectedCampaign.id + "/").success(function(response)
        {
            that.targetEmails = response;
            return that.targetEmails;

        }).error(function(response){

        });
    };

    this.addEmail = function(email, name, id)
    {
        that.emailArray.push({
                email_address: email,
                name: name,
                campaign: id,
                send: false,
            });
    };

    this.removeAddedEmail = function(email)
    {
        that.index = that.emailArray.indexOf(email);
        that.emailArray.splice(that.index, 1);

    }




    this.putEmails = function(selectedCampaign)
    {
        $http.post('/emails/api/targetemails/' + selectedCampaign.id + '/', that.emailArray).success(function(response)
        {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Emails Saved!')
                    .content(response)
                    .ariaLabel('Email save')
                    .ok('Okay')
                    .targetEvent(ev));

            that.emailArray = [];
            //$route.reload();

        }).error(function(response){

        });

    };

    this.deleteCampaign = function(ev, campaign)
    {
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete ' + campaign.name + '?')
            .content()
            .ariaLabel('Delete Campaign')
            .ok('Delete')
            .cancel('Cancel')
            .targetEvent(ev);

        $mdDialog.show(confirm).then(function()
        {
            $http.delete('/emails/api/campaigns/' + campaign.name + "/").success(function(response)
            {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Campaign Deleted!')
                        .content(response.data)
                        .ariaLabel('Campaign Delete')
                        .ok('Okay')
                        .targetEvent(ev)
            );

            }).error(function(response)
            {
            });
        });
    };

    this.deleteEmail = function(ev, email)
    {
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete ' + email.email_address + '?')
            .content()
            .ariaLabel('Delete Campaign')
            .ok('Delete')
            .cancel('Cancel')
            .targetEvent(ev);

        $mdDialog.show(confirm).then(function()
        {
            $http.delete('/emails/api/targetemails/' + email.campaign + '/' + email.id + '/', email).success(function(response)
            {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Email Deleted!')
                        .content(response.data)
                        .ariaLabel('Campaign Delete')
                        .ok('Okay')
                        .targetEvent(ev)
            );

            }).error(function(response)
            {
            });
        });

    };

    this.updateEmail = function(ev, email)
    {
            $http.put('/emails/api/targetemails/' + email.campaign + '/' + email.id + '/', email).success(function(response)
            {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Success!')
                        .content("Your email has been updated.")
                        .ariaLabel('Update Target Email')
                        .ok('Okay')
                        .targetEvent(ev)
            );

            }).error(function(response)
            {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Uh oh!')
                        .content("Please make sure your email is correctly formatted.")
                        .ariaLabel('Campaign Delete')
                        .ok('Okay')
                        .targetEvent(ev)
            );

            });

    };
}]);

app.controller('DemoCtrl', function() {
      this.topDirections = ['left', 'up'];
      this.bottomDirections = ['down', 'right'];
      this.isOpen = false;
      this.availableModes = ['md-fling', 'md-scale'];
      this.selectedMode = 'md-scale';
      this.availableDirections = ['up', 'down', 'left', 'right'];
      this.selectedDirection = 'left';
    });