package com.xls.cut.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HiController {

    @RequestMapping("/hello")
    public String hello(){
        return "hello";
    }


    private void test(){
        System.out.println("测试下代码");
    }

}
