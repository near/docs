---
id: basics
title: Modules, Types & Structs
hide_table_of_contents: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

import {ExplainCode, Block, File} from '@site/src/components/monaco-editor';

<ExplainCode>
  <Block highlights="1-4" fname="contract.ts">
    ## Title

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. 
  </Block>

  <Block highlights="5" fname="contract.ts">
    ## Something Larger

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. In tristique accumsan iaculis. Phasellus varius, nisl in condimentum convallis, magna nisi elementum libero, nec vulputate lacus leo a quam. Duis consectetur condimentum arcu quis dapibus. Sed placerat mattis dolor sed scelerisque. Aliquam ut velit vulputate, lacinia tortor dapibus, interdum lorem. Nulla commodo felis tristique malesuada lacinia. Phasellus condimentum, nulla nec lacinia fermentum, felis enim vestibulum leo, sit amet facilisis tortor magna vel nisi. Donec magna purus, convallis ut facilisis a, iaculis eget elit. 
  </Block>

  <Block highlights="6" fname="contract.ts">
    ## Even More

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. In tristique accumsan iaculis. Phasellus varius, nisl in condimentum convallis, magna nisi elementum libero, nec vulputate lacus leo a quam. Duis consectetur condimentum arcu quis dapibus. Sed placerat mattis dolor sed scelerisque. Aliquam ut velit vulputate, lacinia tortor dapibus, interdum lorem. Nulla commodo felis tristique malesuada lacinia. Phasellus condimentum, nulla nec lacinia fermentum, felis enim vestibulum leo, sit amet facilisis tortor magna vel nisi. Donec magna purus, convallis ut facilisis a, iaculis eget elit. 
  </Block>

  <Block highlights="30" fname="contract.ts">
    ## Small

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisi vel orci faucibus ullamcorper. Donec ut tempor erat, in gravida ante. 
  </Block>

  <File 
    language="js"
    fname="contract.ts" 
    url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
  />
  <File 
    language="js"
    fname="model.ts" 
    url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/model.ts"
    start="3" end="6"
  />
</ExplainCode>