## Ignite Tuition

This is the node version of the authorization microservice for the Ignite project backend.

## Requirements

- Node
- Typescript

## Dependencies

All dependencies are available in package.json

## Build

```
tsc
```

## Run

```
npm install
npm run start or npm run dev
```

or

```
tsc
node ./dist/index.js
```

## Test

```
npm run test or
npm run coverage
```

## Postman Collection

```
src/utils/postman_collection.json
```

## Coverage Report

```

<!doctype html>
<html lang="en">

<head>
    <title>Code coverage report for All files</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="prettify.css" />
    <link rel="stylesheet" href="base.css" />
    <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type='text/css'>
        .coverage-summary .sorter {
            background-image: url(sort-arrow-sprite.png);
        }
    </style>
</head>

<body>
<div class='wrapper'>
    <div class='pad1'>
        <h1>All files</h1>
        <div class='clearfix'>

            <div class='fl pad1y space-right2'>
                <span class="strong">78.89% </span>
                <span class="quiet">Statements</span>
                <span class='fraction'>370/469</span>
            </div>


            <div class='fl pad1y space-right2'>
                <span class="strong">51.56% </span>
                <span class="quiet">Branches</span>
                <span class='fraction'>66/128</span>
            </div>


            <div class='fl pad1y space-right2'>
                <span class="strong">80.89% </span>
                <span class="quiet">Functions</span>
                <span class='fraction'>72/89</span>
            </div>


            <div class='fl pad1y space-right2'>
                <span class="strong">76.73% </span>
                <span class="quiet">Lines</span>
                <span class='fraction'>320/417</span>
            </div>


        </div>
        <p class="quiet">
            Press <em>n</em> or <em>j</em> to go to the next uncovered block, <em>b</em>, <em>p</em> or <em>k</em> for the previous block.
        </p>
        <template id="filterTemplate">
            <div class="quiet">
                Filter:
                <input oninput="onInput()" type="search" id="fileSearch">
            </div>
        </template>
    </div>
    <div class='status-line medium'></div>
    <div class="pad1">
<table class="coverage-summary">
<thead>
<tr>
   <th data-col="file" data-fmt="html" data-html="true" class="file">File</th>
   <th data-col="pic" data-type="number" data-fmt="html" data-html="true" class="pic"></th>
   <th data-col="statements" data-type="number" data-fmt="pct" class="pct">Statements</th>
   <th data-col="statements_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th data-col="branches" data-type="number" data-fmt="pct" class="pct">Branches</th>
   <th data-col="branches_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th data-col="functions" data-type="number" data-fmt="pct" class="pct">Functions</th>
   <th data-col="functions_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th data-col="lines" data-type="number" data-fmt="pct" class="pct">Lines</th>
   <th data-col="lines_raw" data-type="number" data-fmt="html" class="abs"></th>
</tr>
</thead>
<tbody><tr>
	<td class="file medium" data-value="dto/request"><a href="dto/request/index.html">dto/request</a></td>
	<td data-value="55.69" class="pic medium">
	<div class="chart"><div class="cover-fill" style="width: 55%"></div><div class="cover-empty" style="width: 45%"></div></div>
	</td>
	<td data-value="55.69" class="pct medium">55.69%</td>
	<td data-value="79" class="abs medium">44/79</td>
	<td data-value="13.33" class="pct low">13.33%</td>
	<td data-value="30" class="abs low">4/30</td>
	<td data-value="36.84" class="pct low">36.84%</td>
	<td data-value="19" class="abs low">7/19</td>
	<td data-value="50" class="pct medium">50%</td>
	<td data-value="70" class="abs medium">35/70</td>
	</tr>

<tr>
	<td class="file medium" data-value="dto/response"><a href="dto/response/index.html">dto/response</a></td>
	<td data-value="62.06" class="pic medium">
	<div class="chart"><div class="cover-fill" style="width: 62%"></div><div class="cover-empty" style="width: 38%"></div></div>
	</td>
	<td data-value="62.06" class="pct medium">62.06%</td>
	<td data-value="29" class="abs medium">18/29</td>
	<td data-value="28.57" class="pct low">28.57%</td>
	<td data-value="7" class="abs low">2/7</td>
	<td data-value="80" class="pct high">80%</td>
	<td data-value="5" class="abs high">4/5</td>
	<td data-value="59.25" class="pct medium">59.25%</td>
	<td data-value="27" class="abs medium">16/27</td>
	</tr>

<tr>
	<td class="file medium" data-value="entities"><a href="entities/index.html">entities</a></td>
	<td data-value="63.44" class="pic medium">
	<div class="chart"><div class="cover-fill" style="width: 63%"></div><div class="cover-empty" style="width: 37%"></div></div>
	</td>
	<td data-value="63.44" class="pct medium">63.44%</td>
	<td data-value="145" class="abs medium">92/145</td>
	<td data-value="53.06" class="pct medium">53.06%</td>
	<td data-value="49" class="abs medium">26/49</td>
	<td data-value="78.94" class="pct medium">78.94%</td>
	<td data-value="19" class="abs medium">15/19</td>
	<td data-value="63.04" class="pct medium">63.04%</td>
	<td data-value="138" class="abs medium">87/138</td>
	</tr>

<tr>
	<td class="file high" data-value="enums"><a href="enums/index.html">enums</a></td>
	<td data-value="100" class="pic high">
	<div class="chart"><div class="cover-fill cover-full" style="width: 100%"></div><div class="cover-empty" style="width: 0%"></div></div>
	</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="26" class="abs high">26/26</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="6" class="abs high">6/6</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="3" class="abs high">3/3</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="26" class="abs high">26/26</td>
	</tr>

<tr>
	<td class="file high" data-value="exceptions"><a href="exceptions/index.html">exceptions</a></td>
	<td data-value="100" class="pic high">
	<div class="chart"><div class="cover-fill cover-full" style="width: 100%"></div><div class="cover-empty" style="width: 0%"></div></div>
	</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="48" class="abs high">48/48</td>
	<td data-value="50" class="pct medium">50%</td>
	<td data-value="16" class="abs medium">8/16</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="16" class="abs high">16/16</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="32" class="abs high">32/32</td>
	</tr>

<tr>
	<td class="file high" data-value="repository"><a href="repository/index.html">repository</a></td>
	<td data-value="100" class="pic high">
	<div class="chart"><div class="cover-fill cover-full" style="width: 100%"></div><div class="cover-empty" style="width: 0%"></div></div>
	</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="61" class="abs high">61/61</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="7" class="abs high">7/7</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="13" class="abs high">13/13</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="52" class="abs high">52/52</td>
	</tr>

<tr>
	<td class="file high" data-value="services"><a href="services/index.html">services</a></td>
	<td data-value="100" class="pic high">
	<div class="chart"><div class="cover-fill cover-full" style="width: 100%"></div><div class="cover-empty" style="width: 0%"></div></div>
	</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="71" class="abs high">71/71</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="11" class="abs high">11/11</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="14" class="abs high">14/14</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="62" class="abs high">62/62</td>
	</tr>

<tr>
	<td class="file high" data-value="utils"><a href="utils/index.html">utils</a></td>
	<td data-value="100" class="pic high">
	<div class="chart"><div class="cover-fill cover-full" style="width: 100%"></div><div class="cover-empty" style="width: 0%"></div></div>
	</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="10" class="abs high">10/10</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="2" class="abs high">2/2</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="0" class="abs high">0/0</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="10" class="abs high">10/10</td>
	</tr>

</tbody>
</table>
</div>
                <div class='push'></div><!-- for sticky footer -->
            </div><!-- /wrapper -->
            <div class='footer quiet pad2 space-top1 center small'>
                Code coverage generated by
                <a href="https://istanbul.js.org/" target="_blank" rel="noopener noreferrer">istanbul</a>
                at 2023-06-20T04:49:17.427Z
            </div>
        <script src="prettify.js"></script>
        <script>
            window.onload = function () {
                prettyPrint();
            };
        </script>
        <script src="sorter.js"></script>
        <script src="block-navigation.js"></script>
    </body>
</html>

```

### Reference Documentation

For further reference, please consider the following sections:

- [Official Node Documentation](https://nodejs.org/en/docs)
- [Official Node Package Manager Documentation](https://docs.npmjs.com/)
- [Official Express API Documentation](https://expressjs.com/en/5x/api.html)
