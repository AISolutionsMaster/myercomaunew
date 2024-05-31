@regression
Feature: Open Create New Account

        User want to Open Create New Account
        Need to verify that email and join button are displayed

        Background:
                Given User open the home page
                Given User click join button to access JOIN page

        @notprod @low @now @smoke @dev
        Scenario: New user created
                When User input new email - not existing in current system
                And User press Join button
                And User input password with "Hello@1234"
                And User input first name with "Thai"
                And User input last name with "Bui"
                And User input mobile number with "0474482806"
                And User input Date of Birth with "01011991"
                And User input Address with "78 McPhersons Road, BUNDALONG VIC 3730"
                And User press Create Account button
                Then User should see access to the Account page

        @low
        Scenario Outline: Email Validation - <Description>
                When User input email with "<EmailId>"
                And User press Join button
                Then User should see the error message with "Please enter a valid email address"
                Examples:
                        | Description         | EmailId                                                                             |
                        | Missing At Symbol   | invalidexample.com                                                                  |
                        | Empty Email         |                                                                                     |
                        | Invalid Domain      | invalid@example                                                                     |
        @low
        Scenario Outline: Password Validation - <Description>
                When User input email with "buianthai1@gmail.com"
                And User press Join button
                And User input password with "<Password>"
                And User press Create Account button
                Then User should see the password error message with "Please enter a valid password"

                Examples:
                        | Description         | EmailId             | Password |
                        | Short Password      | buianthai@gmail.com | hello1   |
                        | No Uppercase Letter | buianthai@gmail.com | hello123 |
                        | No Number           | buianthai@gmail.com | Helloabc |
                        | Only Number         | buianthai@gmail.com | 12345678 |
        @low 
        Scenario Outline: Other validation - <Description>
                When User input email with "buianthai1@gmail.com"
                And User press Join button
                And User input password with "<Password>"
                And User input first name with "<FirstName>"
                And User input last name with "<LastName>"
                And User input mobile number with "<MobileNumber>"
                And User input Date of Birth with "<DOB>"
                And User input Address with "<Address>"
                And User press Create Account button
                Then User should see the error message for "<ErrorField>" with text "<ErrorMessage>"
                Examples:
                        | Description                     | Password   | FirstName | LastName | MobileNumber | DOB      | Address                                | ErrorField  | ErrorMessage                                  |
                        | FirstName is empty              | Hello1234@ |           | bui      | 0474482806   | 01011991 | 78 McPhersons Road, BUNDALONG VIC 3730 | FirstName   | Please enter a valid name                     |
                        | LastName is empty               | Hello1234@ | Thai      |          | 0474482806   | 01011991 | 78 McPhersons Road, BUNDALONG VIC 3730 | LastName    | Please enter a valid name                     |
                        | MobilePhone is empty            | Hello1234@ | Thai      | bui      |              | 01011991 | 78 McPhersons Road, BUNDALONG VIC 3730 | MobilePhone | Please enter a valid Australian mobile number |
                        | MobilePhone is incorrect format | Hello1234@ | Thai      | bui      | 04744828     | 01011991 | 78 McPhersons Road, BUNDALONG VIC 3730 | MobilePhone | Please enter a valid Australian mobile number |
                        | DateOfBirth is empty            | Hello1234@ | Thai      | bui      | 0474482806   |          | 78 McPhersons Road, BUNDALONG VIC 3730 | DateOfBirth | Please enter a valid birthday                 |
                        | DateOfBirth is incorrect        | Hello1234@ | Thai      | bui      | 0474482806   | 0101199  | 78 McPhersons Road, BUNDALONG VIC 3730 | DateOfBirth | Please enter a valid birthday                 |
                        | Address is empty                | Hello1234@ | Thai      | bui      | 0474482806   | 01011991 |                                        | Address     | Please enter a valid address                  |
        @high @smoke
        Scenario: Verify create new account page
                Then User see the email address, Join button, already member message and create account link
                And User can not see other fields e.g. password, FirstNames etc.
                And User can see term and condition



