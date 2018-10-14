package me.phoibe.doc.cms.utils;

import me.phoibe.doc.cms.exception.BusinessException;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hwpf.extractor.WordExtractor;

import java.io.*;

public class FileUtil {

    private static final String ATTACH_PREFIX = "TXT";

    private static final String DOC_PREFIX = "DOC,DOCX";

    public static String readAttachText(String path){
        String text = "";
        try{
            if(StringUtils.isEmpty(path)){
                throw new BusinessException("文档路径为空！");
            }
            File file = new File(path);
            if(!file.exists()){
                throw new BusinessException("文件不存在");
            }
            String prefix = path.substring(path.lastIndexOf(".")+1);
            if(ATTACH_PREFIX.toUpperCase().contains(prefix.toUpperCase())){
                FileReader fileReader = new FileReader(file);
                BufferedReader bufferedReader = new BufferedReader(fileReader);
                StringBuilder stringBuilder = new StringBuilder();
                String s = "";
                while ((s = bufferedReader.readLine()) != null){
                    stringBuilder.append(s);
                }
                text = stringBuilder.toString();
            }
            if(DOC_PREFIX.toUpperCase().contains(prefix.toUpperCase())) {
                InputStream inputStream = new FileInputStream(file);
                WordExtractor wordExtractor = new WordExtractor(inputStream);
                text = wordExtractor.getText();
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return text;
    }
}
