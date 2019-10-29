package hu.martos.gym.service.util;

import org.apache.commons.lang3.RandomStringUtils;


public final class RandomGeneratorUtil {

    private static final int DEF_COUNT = 20;

    private RandomGeneratorUtil() {
    }

    public static String generatePassword() {
        return RandomStringUtils.randomAlphanumeric(DEF_COUNT);
    }

    public static String generateActivationKey() {
        return RandomStringUtils.randomNumeric(DEF_COUNT);
    }

    public static String generateResetKey() {
        return RandomStringUtils.randomNumeric(DEF_COUNT);
    }
}
