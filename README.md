<b>TRAC ADDRESS: trac1fma08tsp6yuk3xnrdpc0zmtuh4egg59c7ygz26ku0g50xe0xn4ssqy4nm5 </b>

<i> TRAC-Sniffer is built to protect degens, traders and the Trac community from malicious actors, who would try to steal their hard earned $TNK </i>
# 🛡️ TRAC-Sniffer: The Security Layer for TAP Protocol

![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Ecosystem](https://img.shields.io/badge/Ecosystem-TRAC%20/%20TAP-orange)
![Security](https://img.shields.io/badge/Status-Audit%20Ready-green)

**TRAC-Sniffer** is a specialized security tool designed for the Trac/Intercom ecosystem. It protects users by scanning TAP Protocol token deployments for "God Mode" backdoors and centralized vulnerabilities that lead to honeypots and rug pulls.

<img src = "/Screenshot_20260227_100729_Chrome.png" alt="Prototype" />
---

## 🚀 The Problem: The "Auth" Backdoor
In the TAP Protocol, a developer can include an `"auth"` field in their token deployment. This creates a **Token Authority**—a centralized switch that allows the creator to:
* **Freeze Transfers:** Prevent you from selling.
* **Blacklist Wallets:** Lock specific users out of their funds.
* **Manipulate Supply:** Print tokens outside of the fair launch.

**TRAC-Sniffer** exposes these hidden risks before you hit "Swap."

---

## 🛠️ Key Features

### 1. Auth-Guard Scanner
Scans the raw JSON of any `$TICKER` to detect if a **Token Authority** is active. 
* **Green:** Fully Decentralized (No Auth).
* **Red:** Centralized Risk (Auth Detected).

### 2. Deployment Verifier
Cross-references the deployment inscription against the **Official Trac Indexer** to ensure the token isn't a "Ghost Inscription" on a malicious third-party indexer.

### 3. Real-Time Risk Assessment
Provides a "Safety Score" based on:
* `max_supply` vs `limit_per_mint`
* Presence of `royalty` or `fee` extensions.
* Deployment block height age.

---

## 💻 Tech Stack
* **Core Logic:** Python / Flask
* **Data Source:** Trac Core API (`api.trac.network`)
* **Protocol:** TAP-20 (Metaprotocol on Bitcoin)
* **UI:** Dark-mode Cyber-Security Dashboard (Bootstrap)

---

## 📖 How to Use

1. **Clone the Repo:**
   ```bash
   git clone [https://github.com/Afokeoghene/intercom-TRAC-Sniffer.git](https://github.com/Afokeoghene/intercom-TRAC-Sniffer.git)
