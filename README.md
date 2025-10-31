# Google-Sheet-Truncation-Automation

## Overview
Automatically truncates numeric values in Google Sheets to **2 decimal places** while preserving the trailing zeros.

## Purpose
Developed to streamline quartetly data reporting, where consistent decimal formatting is required. This automation is necessary in our company context and saves approximately **1-2 hours per report**. Of course, a version of the truncation function already exists in Sheets: "TRUNC", but the logic could not be set and it was "time consuming to set the parameters and edit each cell."

## Features 
- Truncates numbers to 2 decimal places (can be amended) for any part of the sheet
- Preserves trailing zeros (e.g. 1.305 -> 1.30)
- Toggelable on/off functionality
- Contained: Only runs within specified Google Sheets

## Usage
1. Open Google Sheets -> Extensions -> Apps Script
2. Copy and paste the provided '.gs' code into a new script
3. Save and test by editing a cell

## Example
| Input | Output |
|-------|--------|
| 1.365 |  1.36  |
| 1.305 |  1.30  |
|0.50928|  0.50  |

## Reflection
As you can tell by my code, I am not a developer by any means, I'm a hobbyist. I'm currently studying to be an Electrical Engineer and it's always fun to mess around with little projects in JS. Special thanks to CLAUDE for helping me when I got stuck. This project was designed for portfolio purposes and demonstrates even coders that suck can solve problems using code in the real world.
