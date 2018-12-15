package com.xls.cut.tmp;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

public class JwtDemo {

    static String  key="fsdfwqrwefsfs";

    private static String createJWT(String id, String issuer, String subject, long ttlMillis) {

        //我们将用我们的ApiKey secret来签名我们的JWT
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //我们将用我们的ApiKey secret来签名我们的JWT
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(key);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //让我们设置JWT索赔
        JwtBuilder builder = Jwts.builder().setId(id)
                .setIssuedAt(now)
                .setSubject(subject)
                .setIssuer(issuer)
                .signWith(signatureAlgorithm, signingKey);

        //已经被指定了，让我们把过期的时间加到
        if (ttlMillis >= 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        //构建JWT并将其序列化为一个紧凑的、url安全的字符串
        return builder.compact();
    }
    public static void parseJWT(String jwt) {
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(key))
                .parseClaimsJws(jwt).getBody();

        System.out.println("ID: " + claims.getId());
        System.out.println("Subject: " + claims.getSubject());
        System.out.println("Issuer: " + claims.getIssuer());
        System.out.println("Expiration: " + claims.getExpiration());
    }

    public static void main(String[] args){
        String sgin=createJWT("123","yihui","hahaha",1000*60);
        System.out.println(sgin);

        String jwt="eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMjMiLCJpYXQiOjE1NDQ4OTEzMTgsInN1YiI6ImhhaGFoYSIsImlzcyI6InlpaHVpIiwiZXhwIjoxNTQ0ODkxMzc4fQ.pw8fH7_aCWkQUQCCtD0x5gVFp1b1vvRlBdPE7tS4UBY";
        parseJWT(jwt);
    }

}
