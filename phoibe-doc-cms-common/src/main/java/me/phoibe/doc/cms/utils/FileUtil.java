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

    public static String writeStringToFile(String filePath,StringBuilder sub) {
//        File file = new File(filePath);
//        if (!file.exists()) {
//            try {
//                file.createNewFile();
//                throw new BusinessException("文件"+file.getName()+"不存在已为您创建!");
//            }catch (IOException e) {
//                throw new BusinessException("创建文件异常!");
//            }
//        }else{
//            throw new BusinessException("文件"+file.getName()+"已存在!");
//        }
//        FileOutputStream fos = null;
//        PrintStream ps = null;
//        try {
//            fos = new FileOutputStream(file,true);// 文件输出流	追加
//            ps = new PrintStream(fos);
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        }
//        ps.print(sub); // 执行写操作
//        ps.close();	// 关闭流

        return "";
    }
}
