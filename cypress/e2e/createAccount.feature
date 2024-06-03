@regression
Feature: Test create new account

        User want to Open Create New Account
        Need to verify that email and join button are displayed

        Background:
                Given User open the home page
                Given User click join button to access JOIN page

        @notprod @low @now @smoke @dev
        Scenario: Test new account create
                When User input new email - not existing in current system
                And User press Join button
                And User input password with "Hello@1234"
                And User input first name with "Theu"
                And User input last name with "Nguyen"
                And User input mobile number with "0434343446"
                And User input Date of Birth with "12021994"
                And User input Address with "78 McPhersons Road, BUNDALONG VIC  3730"
                And User press Create Account button
                Then User should see access to the Account page
        
        @low
        Scenario: Missing First Name value
                When User input new email - not existing in current system
                And User press Join button
                And User input password with "Hello@1234"
                And User input first name with ""
                And User press Create Account button
                Then User should see the error message for "FirstName" with text "Please enter a valid name"
        @low 
        Scenario: Invalid email format
                When User input email with "blahblan"
                And User press Join button
                Then User should see the error message with "Please enter a valid email address"

        @low
        Scenario: Weak password
                When User input email with "nguyenthitheu123@cmcglobal.com"
                And User press Join button
                And User input password with "abc"
                And User press Create Account button
                Then User should see the password error message with "Please enter a valid password"

