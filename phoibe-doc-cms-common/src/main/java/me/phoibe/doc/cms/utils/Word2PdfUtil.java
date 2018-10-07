package me.phoibe.doc.cms.utils;


import com.aspose.words.Document;
import com.aspose.words.SaveFormat;

import java.io.File;
import java.io.FileOutputStream;


/**
 * @author Administrator
 * @version $Id$
 * @since
 * @see
 */
public class Word2PdfUtil {

    public static void main(String[] args) {
        doc2pdf("F:/Java_WorkSpace/satic/docword/7061a29cc0f2be6286aec89bd4b30747/深度解读，太平洋战争初期美军为何打不过日军？ - ces.doc","F:/Java_WorkSpace/satic/docword/7061a29cc0f2be6286aec89bd4b30747/深度解读，太平洋战争初期美军为何打不过日军？ - ces.pdf");
    }


    public static void doc2pdf(String inPath, String outPath) {

        try {
            long old = System.currentTimeMillis();
            File file = new File(outPath); // 新建一个空白pdf文档
            FileOutputStream os = new FileOutputStream(file);
            Document doc = new Document(inPath); // Address是将要被转化的word文档
            doc.save(os, SaveFormat.PDF);// 全面支持DOC, DOCX, OOXML, RTF HTML, OpenDocument, PDF,
            // EPUB, XPS, SWF 相互转换
            long now = System.currentTimeMillis();
            System.out.println("共耗时：" + ((now - old) / 1000.0) + "秒"); // 转化用时
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
