package me.phoibe.doc.cms.utils;

import me.phoibe.doc.cms.exception.BusinessException;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.POIXMLDocument;
import org.apache.poi.POIXMLTextExtractor;
import org.apache.poi.hwpf.extractor.WordExtractor;
import org.apache.poi.openxml4j.exceptions.OpenXML4JException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.xmlbeans.XmlException;

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
    public static String readFileText(String path){
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
            if("txt".toUpperCase().contains(prefix.toUpperCase())){
                BufferedReader buf=new BufferedReader(new FileReader(path));
                StringBuffer sbuf=new StringBuffer();
                String line=null;
                while((line=buf.readLine())!=null){
                    sbuf.append(buf.readLine());
                }
                buf.close();
                text = buf.toString();
            }
            if("doc".toUpperCase().contains(prefix.toUpperCase())){
                InputStream is = new FileInputStream(new File(path));
                WordExtractor ex = new WordExtractor(is);
                text = ex.getText();
            }
            if("docx".toUpperCase().contains(prefix.toUpperCase())){
                OPCPackage opcPackage = POIXMLDocument.openPackage(path);
                POIXMLTextExtractor extractor = new XWPFWordExtractor(opcPackage);
                text = extractor.getText();
            }
        } catch (org.apache.poi.UnsupportedFileFormatException | XmlException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (OpenXML4JException e) {
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
