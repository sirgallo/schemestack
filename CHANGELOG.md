# Change Log

## v0.1 - April 9, 2020

This is the first test release. This release contains the bare minimum required to query Presto using Scheme's Query Generation tool, which currently includes Select, Join, Where, Order By, and Limit Clauses.

## v0.11 - April 21, 2020

This release contains added functionality and minor enhancements. The main changes are to the ability to use SQL Functions, Group by Clauses, and Having Clauses. Users now will return more consistent results (as well as more results...fixed a major bug).

## v0.2 - May 28, 2020

This release contains added functionality and bug fixes, with the most exciting update being the ability to save queries to run again later.

## v0.3 - November 17, 2020

This release brings Scheme closer to production, with features such as user login with encrypted passwords and JSON web token for session state. Minor changes to the backend, as well as serving the frontend with its own dedicated nginx server instead of http-server, should also help with user experience.