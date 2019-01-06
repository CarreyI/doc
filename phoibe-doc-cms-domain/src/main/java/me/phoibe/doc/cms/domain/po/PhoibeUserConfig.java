package me.phoibe.doc.cms.domain.po;

public class PhoibeUserConfig {
    private int id;
    private int userId;
    private int warsOrTactics;
    private String config;
    private String configNames;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getWarsOrTactics() {
        return warsOrTactics;
    }

    public void setWarsOrTactics(int warsOrTactics) {
        this.warsOrTactics = warsOrTactics;
    }

    public String getConfig() {
        return config;
    }

    public void setConfig(String config) {
        this.config = config;
    }

    public String getConfigNames() {
        return configNames;
    }

    public void setConfigNames(String configNames) {
        this.configNames = configNames;
    }
}
