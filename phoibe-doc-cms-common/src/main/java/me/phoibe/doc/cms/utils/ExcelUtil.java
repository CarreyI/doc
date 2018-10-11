package me.phoibe.doc.cms.utils;

import org.apache.poi.hssf.usermodel.*;

import java.util.List;

public class ExcelUtil {
    public static HSSFWorkbook getHSSFWorkbook(String sheetName, List<String> title, List<List<String>> values, HSSFWorkbook wb){
        if(wb == null){
            wb = new HSSFWorkbook();
        }
        HSSFSheet sheet = wb.createSheet(sheetName);
        HSSFRow row = sheet.createRow(0);
        HSSFCell cell = null;

        for(int i=0;i<title.size();i++){
            cell = row.createCell(i);
            cell.setCellValue(title.get(i));
        }

        for(int i=0;i<values.size();i++){
            row = sheet.createRow(i + 1);
            List<String> rowList = values.get(i);
            for(int j=0;j<rowList.size();j++){
                String lineValue = "";
                if (rowList.get(j)!=null){
                    lineValue = rowList.get(j);
                }
                row.createCell(j).setCellValue(lineValue);
            }
        }
        return wb;
    }
}
