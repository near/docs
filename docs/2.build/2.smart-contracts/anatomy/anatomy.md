---
id: anatomy
title: Basic Anatomy
hide_table_of_contents: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

import {ExplainCode, Block, File} from '@site/src/components/code-explainer';

<ExplainCode languages={["js", "rust"]} alternativeURL="/build/smart-contracts/anatomy/environment">
  <Block highlights={{"js": "1-4"}} fname="contract">
    ## Title
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. 
  </Block>
  <Block highlights={{"rust": "1-4"}} fname="contract">
    ## ONLY RUST
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. 
  </Block>
  <Block highlights={{"js": "1-4", "rust": "1-4"}} fname="model">
    ## IN BOTH
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. 
  </Block>
  <Block highlights={{"js": "1-4"}} fname="contract">
    ## Title

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. 
  </Block>
  <Block highlights={{"js": "1-4"}} fname="contract">

      ## Even More

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. In tristique accumsan iaculis. Phasellus varius, nisl in condimentum convallis, magna nisi elementum libero, nec vulputate lacus leo a quam. Duis consectetur condimentum arcu quis dapibus. Sed placerat mattis dolor sed scelerisque. Aliquam ut velit vulputate, lacinia tortor dapibus, interdum lorem. Nulla commodo felis tristique malesuada lacinia. Phasellus condimentum, nulla nec lacinia fermentum, felis enim vestibulum leo, sit amet facilisis tortor magna vel nisi. Donec magna purus, convallis ut facilisis a, iaculis eget elit. 
  </Block>

  <Block highlights={{"js": "1-4"}} fname="contract">
    ## Title

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. 
  </Block>
  <Block highlights={{"js": "1-4"}} fname="contract">
    ## Even More
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. In tristique accumsan iaculis. Phasellus varius, nisl in condimentum convallis, magna nisi elementum libero, nec vulputate lacus leo a quam. Duis consectetur condimentum arcu quis dapibus. Sed placerat mattis dolor sed scelerisque. Aliquam ut velit vulputate, lacinia tortor dapibus, interdum lorem. Nulla commodo felis tristique malesuada lacinia. Phasellus condimentum, nulla nec lacinia fermentum, felis enim vestibulum leo, sit amet facilisis tortor magna vel nisi. Donec magna purus, convallis ut facilisis a, iaculis eget elit. 
  </Block>
  <Block highlights={{"js": "1-4"}} fname="contract">
    ## Title
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. 
  </Block>
  <Block highlights={{"js": "1-4"}} fname="contract">
    ## Title
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. 
  </Block>
  <File
    language="js"
    fname="contract" 
    url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
  />
  <File
    language="js"
    fname="model" 
    url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/model.ts"
    start="3" end="6"
  />
    <File
    language="rust"
    fname="contract" 
    url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
  />
  <File
    language="rust"
    fname="model" 
    url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
    start="3" end="6"
  />

</ExplainCode>