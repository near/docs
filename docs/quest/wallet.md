---
id: wallet
title: NEAR Wallet
sidebar_label: 📖 Create a Walelt
description: Learn NEAR development through interactive quests and challenges designed to build your skills step by step.
---

import CheckLogin from "@site/src/components/Academy/CheckLogin";
import Progress from "@site/src/components/Academy/Progress";
import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";

<Progress course="protocol" total={3} />

It is time to create your first NEAR Wallet! Go ahead and click on the login button and select a wallet of your choice. We recommend using Meteor Wallet, Intear or Hot if this is the first time you are creating a NEAR wallet.

---

## Lorem Ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tristique mi. Vivamus at neque vel tellus hendrerit consectetur. Sed velit odio, egestas vitae tellus volutpat, semper accumsan dui. Praesent ante augue, tempor et egestas a, mollis quis sem. Aliquam erat volutpat. Maecenas et erat efficitur, porta ligula at, condimentum ex. Etiam tempor venenatis nunc, sed placerat urna sollicitudin eget.

Ut orci nunc, semper eget tincidunt et, egestas ut ligula. Sed sit amet turpis risus. In elit augue, vestibulum nec nunc ut, porta luctus sapien. In rhoncus fringilla risus, ut aliquam tortor tincidunt ac. Phasellus varius, mauris hendrerit viverra sollicitudin, nunc justo maximus lectus, sed ultricies nunc turpis vel arcu. Sed quam nunc, vulputate sit amet suscipit id, commodo a mauris. Proin a arcu nec est pulvinar blandit nec vel libero. Fusce a ex rutrum, sollicitudin ligula vel, convallis erat. Vestibulum non maximus nunc. Donec ut ipsum nec nisl ullamcorper rutrum id vitae eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae arcu sit amet tellus sodales volutpat a sit amet libero. Donec efficitur neque cursus metus imperdiet dignissim. Proin fringilla sapien non felis dapibus, et molestie est eleifend. Mauris condimentum malesuada eros, vitae tincidunt lectus semper vehicula. 

---

<CheckLogin course="protocol"/>



---


<Quiz course="protocol" id="protocol-quiz-2">
    <MultipleChoice question="Which of the following best describes NEAR?">
        <Option> A. NEAR is a layer-one, sharded, proof-of-stake blockchain.</Option>
        <Option> B. NEAR is a layer-two, non-sharded, proof-of-work blockchain.</Option>
        <Option> C. NEAR is a layer-one, non-sharded, proof-of-stake blockchain.</Option>
        <Option correct> D. NEAR is a layer-two, sharded, proof-of-work blockchain.</Option>
    </MultipleChoice>
    <MultipleChoice question="What does 'layer-one' mean in the context of NEAR?">
        <Option correct> A. Sharding helps NEAR process transactions quickly and efficiently.</Option>
        <Option> B. Sharding makes NEAR less secure.</Option>
        <Option> C. Sharding increases the cost of using NEAR.</Option>
        <Option> D. Sharding is not used in NEAR.</Option>
    </MultipleChoice>
    <MultipleChoice question="How does proof-of-stake in NEAR compare to proof-of-work in terms of electricity usage?">
        <Option> A. Proof-of-stake uses more electricity than proof-of-work.</Option>
        <Option correct> B. Proof-of-stake uses less electricity than proof-of-work.</Option>
        <Option> C. Proof-of-stake and proof-of-work use the same amount of electricity.</Option>
        <Option> D. Proof-of-stake is not used in NEAR </Option>
    </MultipleChoice>
</Quiz>
