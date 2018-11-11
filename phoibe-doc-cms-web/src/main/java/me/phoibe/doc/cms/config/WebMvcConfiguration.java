package me.phoibe.doc.cms.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration  
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {
	
	@Value("${breakpoint.upload.window}")
	private String window;
	@Value("${breakpoint.upload.linux}")
	private String linux;
	@Value("${breakpoint.upload.status}")
	private String status;
	@Value("${spring.thymeleaf.prefix}")
	private String prefix;
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
		String finalDirPath="";
		if(status.equals("1")) {
			finalDirPath = window;
		}else {
			finalDirPath = linux;
		}
        registry.addResourceHandler("/docword/**").addResourceLocations("file:"+finalDirPath);
        registry.addResourceHandler("/**").addResourceLocations(prefix);
        super.addResourceHandlers(registry);
    }
    @Override
	public void addViewControllers(ViewControllerRegistry registry){
		registry.addRedirectViewController("/","index.html");
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
		super.addViewControllers(registry);
	}
}
