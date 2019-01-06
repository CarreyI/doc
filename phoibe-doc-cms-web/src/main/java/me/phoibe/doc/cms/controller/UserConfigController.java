package me.phoibe.doc.cms.controller;

import me.phoibe.doc.cms.domain.po.PhoibeUserConfig;
import me.phoibe.doc.cms.entity.Code;
import me.phoibe.doc.cms.entity.Result;
import me.phoibe.doc.cms.service.PhoibeUserConfigService;
import me.phoibe.doc.cms.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/phoibe/userConfig")
public class UserConfigController {

    @Autowired
    private PhoibeUserConfigService phoibeUserConfigService;

    /**
     * 保存用户配置
     * 先查询用户有没有配置
     * 如果没有配置就保存用户配置，如果有配置就删除再保存
     */
    @GetMapping("/insertConfig/{userId}")
    public String insertConfig(@PathVariable Integer userId, @RequestBody PhoibeUserConfig phoibeUserConfig){
        boolean count = phoibeUserConfigService.selectUserConfigRecords(userId);
        //如果用户之前有配置，就删除掉
        if (count){
            phoibeUserConfigService.deleteUserConfigByUserId(userId);
        }
        boolean result = phoibeUserConfigService.insertUserConfig(phoibeUserConfig);
        if (result){
            return JsonUtils.toJson(new Result<>(Code.SUCCESS, ""));
        }else{
            return JsonUtils.toJson(new Result<>(Code.FAILED,""));
        }
    }

    @GetMapping("/selectConfig/{userId}/{warsOrTactics}")
    public String selectConfig(@PathVariable Integer userId,@PathVariable Integer warsOrTactics){
       String[] result = phoibeUserConfigService.selectUserConfig(userId,warsOrTactics);
       return JsonUtils.toJson(new Result<>(Code.SUCCESS,result));
    }
}
